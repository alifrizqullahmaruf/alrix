"use client";

import { useState, useRef, useCallback } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props {
  imageUrl: string;
  initialCrop?: CropData;
  onConfirm: (crop: CropData) => void;
  onCancel: () => void;
}

// Matches ProjectCard image area aspect ratio (width / height = ~2.46)
const ASPECT = 16 / 9;
const PREVIEW_W = 320;
const PREVIEW_H = Math.round(PREVIEW_W / ASPECT);

export default function ImageCropper({ imageUrl, initialCrop, onConfirm, onCancel }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop | undefined>(
    initialCrop
      ? { unit: "%", x: initialCrop.x, y: initialCrop.y, width: initialCrop.width, height: initialCrop.height }
      : undefined
  );

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      if (!initialCrop) {
        setCrop(centerCrop(makeAspectCrop({ unit: "%", width: 90 }, ASPECT, width, height), width, height));
      }
    },
    [initialCrop]
  );

  function handleConfirm() {
    if (!crop) return;
    onConfirm({ x: crop.x, y: crop.y, width: crop.width, height: crop.height });
  }

  // Compute preview styles from percentage crop
  const previewStyle: React.CSSProperties = crop
    ? {
        position: "absolute",
        width: `${(100 / crop.width) * 100}%`,
        height: `${(100 / crop.height) * 100}%`,
        left: `${(-crop.x / crop.width) * 100}%`,
        top: `${(-crop.y / crop.height) * 100}%`,
      }
    : { width: "100%", height: "100%", objectFit: "cover" };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-5 w-full max-w-xl flex flex-col gap-4">
        <div>
          <h3 className="text-neutral-black font-poppins font-bold text-sm">Crop Image</h3>
          <p className="text-neutral-medium font-poppins text-xs mt-0.5">
            Drag untuk pilih area yang tampil di card project.
          </p>
        </div>

        {/* Crop area — scrollable if image is very tall */}
        <div className="rounded-xl overflow-auto bg-neutral-100 max-h-[50vh] flex items-start justify-center">
          <ReactCrop
            crop={crop}
            onChange={(_, pct) => setCrop(pct)}
            aspect={ASPECT}
            minWidth={20}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imageUrl}
              alt="crop"
              onLoad={onImageLoad}
              style={{ display: "block", maxWidth: "100%", maxHeight: "50vh" }}
            />
          </ReactCrop>
        </div>

        {/* Preview */}
        {crop && (
          <div>
            <p className="text-neutral-medium font-poppins text-xs mb-2">Preview card:</p>
            <div
              className="rounded-xl overflow-hidden relative bg-bg-light border border-neutral-light"
              style={{ width: PREVIEW_W, height: PREVIEW_H }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="preview" style={previewStyle} />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            disabled={!crop}
            className="px-5 py-2 rounded-xl bg-neutral-black text-white font-poppins font-semibold text-xs hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            Apply Crop
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-xl border border-neutral-light text-neutral-dark font-poppins text-xs hover:bg-bg-light transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
