// "use client";

// import * as React from "react";

// export interface useCopyToClipboardProps {
//   timeout?: number;
// }

// export function useCopyToClipboard({
//   timeout = 2000,
// }: useCopyToClipboardProps) {
//   const [isCopied, setIsCopied] = React.useState<Boolean>(false);

//   const copyToClipboard = (value: string) => {
//     if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
//       return;
//     }

//     if (!value) {
//       return;
//     }

//     navigator.clipboard.writeText(value).then(() => {
//       setIsCopied(true);

//       setTimeout(() => {
//         setIsCopied(false);
//       }, timeout);
//     });
//   };

//   return { isCopied, copyToClipboard };
// }

"use client";

import * as React from "react";

export interface useCopyToClipboardProps {
  timeout?: number;
}

export function useCopyToClipboard({
  timeout = 2000,
}: useCopyToClipboardProps) {
  const [isCopied, setIsCopied] = React.useState<Boolean>(false);

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !value) {
      return;
    }

    const copyFallback = (text: string) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;

      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        setIsCopied(true);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }

      document.body.removeChild(textArea);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          setIsCopied(true);
        })
        .catch((err) => {
          console.warn(
            "Failed to use clipboard API, falling back to execCommand",
            err,
          );
          copyFallback(value);
        });
    } else {
      copyFallback(value);
    }

    setTimeout(() => {
      setIsCopied(false);
    }, timeout);
  };

  return { isCopied, copyToClipboard };
}
