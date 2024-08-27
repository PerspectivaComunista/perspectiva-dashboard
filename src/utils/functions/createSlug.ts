function createSlug(title: string): string {
  const removeDiacritics = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  let slug = removeDiacritics(title);

  slug = slug.toLowerCase();

  slug = slug
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  slug = slug.substring(0, 30);

  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
}

export default createSlug;
