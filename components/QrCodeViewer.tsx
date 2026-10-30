"use client";

import Image from "next/image";
import { ExternalLink, Maximize2, X } from "lucide-react";
import { useId, useRef } from "react";

type QrCodeViewerProps = {
  size?: number;
  variant?: "footer" | "contact";
};

export default function QrCodeViewer({
  size = 100,
  variant = "contact",
}: QrCodeViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <div className={`qr-viewer qr-viewer-${variant}`}>
      <button
        type="button"
        className="qr-trigger"
        aria-label="放大猫谱科技公众号二维码"
        onClick={() => dialogRef.current?.showModal()}
      >
        <Image
          src="/assets/wechat-qr.jpg"
          alt="猫谱科技公众号二维码"
          width={size}
          height={size}
          unoptimized
          draggable={false}
        />
        <span><Maximize2 size={12} /> 点击放大</span>
      </button>

      <dialog
        ref={dialogRef}
        className="qr-dialog"
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="qr-dialog-panel">
          <button
            type="button"
            className="qr-dialog-close"
            aria-label="关闭二维码"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={21} />
          </button>
          <span className="eyebrow">WECHAT OFFICIAL ACCOUNT</span>
          <h2 id={titleId}>猫谱科技公众号</h2>
          <p>使用微信扫一扫；手机端可长按下方二维码识别。</p>
          <div className="qr-dialog-image">
            <Image
              src="/assets/wechat-qr.jpg"
              alt="猫谱科技公众号二维码大图"
              width={430}
              height={430}
              unoptimized
              draggable={false}
            />
          </div>
          <a
            href="/assets/wechat-qr.jpg"
            target="_blank"
            rel="noreferrer"
            className="button button-primary"
          >
            打开二维码原图 <ExternalLink size={16} />
          </a>
        </div>
      </dialog>
    </div>
  );
}
