type Resource = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  linked_product_id: string | null;
  file: {
    url: string;
    name: string;
    type: "mp4" | "pdf";
  };
};

export default Resource;
