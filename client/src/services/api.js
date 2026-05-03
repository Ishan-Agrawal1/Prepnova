const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || data.error || "Upload failed");
  }

  return data.data?.result || data.result || data.data;
}

export async function getAnalyses() {
  const response = await fetch(`${API_URL}/analyses`);
  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || data.error || "Failed to fetch analyses");
  }

  return data.data;
}