"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ImageCropper, { type CropData } from "./ImageCropper";

// Convert known sharing URLs to direct embeddable image URLs
function normalizeImageUrl(url: string): string {
  // Imgur single image page: imgur.com/AbCdEfG → i.imgur.com/AbCdEfG.jpg
  const imgurPage = url.match(/^https?:\/\/imgur\.com\/([a-zA-Z0-9]+)$/);
  if (imgurPage) return `https://i.imgur.com/${imgurPage[1]}.jpg`;
  return url;
}

// Return a hint if the URL is a known unsupported sharing format
function getUrlHint(url: string): string | null {
  if (/drive\.google\.com/.test(url)) return "Google Drive tidak bisa di-embed. Gunakan Imgur — upload gambar lalu copy \"Copy image address\".";
  if (/imgur\.com\/a\//.test(url) || /imgur\.com\/gallery\//.test(url)) return "Ini adalah link album Imgur. Buka albumnya, klik gambarnya, lalu klik kanan → \"Copy image address\" untuk mendapat link langsung (contoh: i.imgur.com/xxx.jpg).";
  return null;
}

interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  imageUrl: string;
  imageCrop?: CropData;
  github: string;
  demo: string;
  order: number;
}

const EMPTY: Omit<Project, "id"> = {
  name: "",
  description: "",
  stack: [],
  imageUrl: "",
  github: "",
  demo: "",
  order: 0,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Project, "id">>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [stackInput, setStackInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  async function fetchProjects() {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const snap = await getDocs(q);
    setProjects(
      snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Project, "id">) }))
    );
    setLoading(false);
  }

  useEffect(() => { fetchProjects(); }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  function openNew() {
    setForm(EMPTY);
    setStackInput("");
    setEditingId(null);
    setShowForm(true);
    setImageLoaded(false);
    setImageError(false);
  }

  function openEdit(p: Project) {
    const { id, ...rest } = p;
    setForm(rest);
    setStackInput(p.stack.join(", "));
    setEditingId(id);
    setShowForm(true);
    setImageLoaded(!!p.imageUrl);
    setImageError(false);
  }

  function cancel() {
    setShowForm(false);
    setEditingId(null);
  }

  async function handleSave() {
    setSaving(true);
    const raw = {
      ...form,
      imageUrl: normalizeImageUrl(form.imageUrl),
      stack: stackInput.split(",").map((s) => s.trim()).filter(Boolean),
    };
    // Firestore rejects undefined — strip all undefined fields
    const data = Object.fromEntries(Object.entries(raw).filter(([, v]) => v !== undefined));
    if (editingId) {
      await updateDoc(doc(db, "projects", editingId), data);
    } else {
      await addDoc(collection(db, "projects"), { ...data, createdAt: Date.now() });
    }
    await fetchProjects();
    setShowForm(false);
    setEditingId(null);
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus project ini?")) return;
    await deleteDoc(doc(db, "projects", id));
    await fetchProjects();
  }

  function handleCropConfirm(crop: CropData) {
    setForm((f) => ({ ...f, imageCrop: crop }));
    setShowCropper(false);
  }

  const crop = form.imageCrop;
  const resolvedImageUrl = form.imageUrl ? normalizeImageUrl(form.imageUrl) : "";

  return (
    <div className="min-h-screen bg-bg-white">
      {/* Crop modal */}
      {showCropper && resolvedImageUrl && (
        <ImageCropper
          imageUrl={resolvedImageUrl}
          initialCrop={form.imageCrop}
          onConfirm={handleCropConfirm}
          onCancel={() => setShowCropper(false)}
        />
      )}

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-light sticky top-0 bg-bg-white z-10">
        <div>
          <h1 className="text-neutral-black font-poppins font-bold text-base">Admin Dashboard</h1>
          <p className="text-neutral-medium font-poppins text-xs">Manage your portfolio projects</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openNew}
            className="px-4 py-2 rounded-xl bg-neutral-black text-white font-poppins font-semibold text-xs hover:opacity-80 transition-opacity"
          >
            + Add Project
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl border border-neutral-light text-neutral-dark font-poppins text-xs hover:bg-bg-light transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-6">
        {/* Form */}
        {showForm && (
          <div className="mb-6 rounded-2xl border border-neutral-light p-5 bg-bg-light">
            <h2 className="text-neutral-black font-poppins font-bold text-sm mb-4">
              {editingId ? "Edit Project" : "New Project"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Project Name">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="CultureConnect"
                  className={inputClass}
                />
              </Field>

              <Field label="Order (display position)">
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className={inputClass}
                />
              </Field>

              <Field label="Description" className="sm:col-span-2">
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short description of the project"
                  rows={2}
                  className={inputClass + " resize-none"}
                />
              </Field>

              <Field label="Tech Stack (comma separated)" className="sm:col-span-2">
                <input
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  placeholder="React, TypeScript, Node.js"
                  className={inputClass}
                />
              </Field>

              <Field label="GitHub URL">
                <input
                  value={form.github}
                  onChange={(e) => setForm({ ...form, github: e.target.value })}
                  placeholder="https://github.com/..."
                  className={inputClass}
                />
              </Field>

              <Field label="Demo URL">
                <input
                  value={form.demo}
                  onChange={(e) => setForm({ ...form, demo: e.target.value })}
                  placeholder="https://..."
                  className={inputClass}
                />
              </Field>

              <Field label="Image URL" className="sm:col-span-2">
                <input
                  value={form.imageUrl}
                  onChange={(e) => {
                    setForm({ ...form, imageUrl: e.target.value, imageCrop: undefined });
                    setImageLoaded(false);
                    setImageError(false);
                  }}
                  placeholder="https://i.imgur.com/..."
                  className={inputClass}
                />
                {form.imageUrl && getUrlHint(form.imageUrl) && (
                  <p className="text-amber-500 font-poppins text-xs mt-1.5">
                    {getUrlHint(form.imageUrl)}
                  </p>
                )}
              </Field>
            </div>

            {/* Image section */}
            {resolvedImageUrl && (
              <div className="mt-4">
                {/* Hidden img to detect load */}
                {!imageLoaded && !imageError && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resolvedImageUrl}
                    alt=""
                    className="hidden"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                )}

                {!imageLoaded && !imageError && (
                  <p className="text-neutral-medium font-poppins text-xs">Loading image preview...</p>
                )}

                {imageError && (
                  <p className="text-red-400 font-poppins text-xs">
                    Gambar tidak bisa dimuat. Gunakan direct image URL — klik kanan gambar → <strong>"Copy image address"</strong>.
                  </p>
                )}

                {imageLoaded && (
                  <div className="flex items-start gap-4">
                    {/* Preview with crop applied */}
                    <div>
                      <p className="text-neutral-medium font-poppins text-xs mb-2">
                        Preview card {crop ? "(cropped)" : "(full image)"}:
                      </p>
                      <div
                        className="rounded-xl overflow-hidden relative bg-bg-light border border-neutral-light"
                        style={{ height: "80px", width: "200px" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={resolvedImageUrl}
                          alt="preview"
                          style={
                            crop
                              ? {
                                  position: "absolute",
                                  width: `${100 / (crop.width / 100)}%`,
                                  height: `${100 / (crop.height / 100)}%`,
                                  left: `${-(crop.x / crop.width) * 100}%`,
                                  top: `${-(crop.y / crop.height) * 100}%`,
                                }
                              : { width: "100%", height: "100%", objectFit: "cover" }
                          }
                        />
                      </div>
                    </div>

                    {/* Crop button */}
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => setShowCropper(true)}
                        className="px-4 py-2 rounded-xl border border-neutral-light text-neutral-dark font-poppins text-xs hover:bg-bg-light transition-colors"
                      >
                        {crop ? "Re-crop Image" : "Crop Image"}
                      </button>
                      {crop && (
                        <button
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, imageCrop: undefined }))}
                          className="block mt-2 text-xs font-poppins text-neutral-medium hover:text-neutral-dark transition-colors"
                        >
                          Reset crop
                        </button>
                      )}
                    </div>
                  </div>
                )}

              </div>
            )}

            <div className="flex gap-2 mt-5">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-neutral-black text-white font-poppins font-semibold text-xs hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {saving ? "Saving..." : editingId ? "Update" : "Save"}
              </button>
              <button
                onClick={cancel}
                className="px-5 py-2 rounded-xl border border-neutral-light text-neutral-dark font-poppins text-xs hover:bg-bg-light transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Project list */}
        {loading ? (
          <p className="text-neutral-medium font-poppins text-sm text-center py-12">Loading...</p>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-medium font-poppins text-sm">No projects yet.</p>
            <p className="text-neutral-light font-poppins text-xs mt-1">Click "+ Add Project" to get started.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 rounded-2xl border border-neutral-light p-4 bg-bg-white hover:shadow-sm transition-shadow"
              >
                <div className="w-16 h-12 rounded-xl shrink-0 overflow-hidden relative bg-bg-light border border-neutral-light flex items-center justify-center">
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      style={
                        p.imageCrop
                          ? {
                              position: "absolute",
                              width: `${100 / (p.imageCrop.width / 100)}%`,
                              height: `${100 / (p.imageCrop.height / 100)}%`,
                              left: `${-(p.imageCrop.x / p.imageCrop.width) * 100}%`,
                              top: `${-(p.imageCrop.y / p.imageCrop.height) * 100}%`,
                            }
                          : { width: "100%", height: "100%", objectFit: "cover" }
                      }
                    />
                  ) : (
                    <span className="text-neutral-medium font-poppins font-bold text-sm">
                      {p.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-neutral-black font-poppins font-semibold text-sm truncate">{p.name}</p>
                  <p className="text-neutral-medium font-poppins text-xs truncate mt-0.5">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-full text-xs font-poppins"
                        style={{ background: "#f0f4ff", color: "#1e3cff" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(p)}
                    className="px-3 py-1.5 rounded-xl border border-neutral-light text-neutral-dark font-poppins text-xs hover:bg-bg-light transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1.5 rounded-xl border border-red-200 text-red-500 font-poppins text-xs hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="text-neutral-dark text-xs font-poppins font-medium block mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-neutral-light bg-bg-white text-neutral-black font-poppins text-sm outline-none focus:border-neutral-dark transition-colors";
