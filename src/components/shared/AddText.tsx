import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AddText({
  setWriteText,
}: {
  setWriteText: (value: string) => void;
}) {
  const handleTextChange = (text: string) => {
    const footnoteRegex = /\[\[\s*footnote\s*\]\]/g;
    let counter = 1;
    const newText = text.replace(footnoteRegex, () => {
      const replacement = `<a href="#sup${counter}"><sup>${counter}</sup></a>`;
      counter += 1;
      return replacement;
    });

    setWriteText(newText);
  };

  return <ReactQuill theme="snow" onChange={handleTextChange} />;
}
