export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch("https://prepnova.onrender.com/upload", {
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
  const response = await fetch("https://prepnova.onrender.com/analyses");
  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || data.error || "Failed to fetch analyses");
  }

  return data.data;
}