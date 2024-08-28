import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AddText({
  setWriteText,
}: {
  setWriteText: (value: string) => void;
}) {
  const handleTextChange = (text: string) => {
    // Inlocuire pentru [[ numbernote ]]
    const footnoteRegex = /\[\[\s*numbernote\s*\]\]/g;
    let counter = 1;
    let newText = text.replace(footnoteRegex, () => {
      const replacement = `<a href="#sup${counter}"><sup>${counter}</sup></a>`;
      counter += 1;
      return replacement;
    });

    // Inlocuire pentru [[footnote: {text}]]
    const detailedFootnoteRegex = /\[\[\s*footnote:\s*(.*?)\s*\]\]/g;
    counter = 1;
    newText = newText.replace(detailedFootnoteRegex, (match, p1) => {
      const replacement = `<p id="sup${counter}"><sup>${counter}</sup>${p1}</p>`;
      counter += 1;
      return replacement;
    });

    setWriteText(newText);
  };

  return <ReactQuill theme="snow" onChange={handleTextChange} />;
}
