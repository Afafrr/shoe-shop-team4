export function FormDataToObject(formData: FormData) {
  const object: Record<string, any> = {};
  formData.forEach((value, key) => {
    try {
      object[key] = JSON.parse(value as string);
    } catch {
      object[key] = value;
    }
  });
  return object;
}
