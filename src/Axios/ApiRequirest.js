import { toast } from "react-toastify";
import api from "./AxiosInterceptor";

const apiUrl = "http://localhost:5000/api/v1";

// const apiUrl = "https://physiohub.onrender.com/api/v1";

// Common function for POST requests (login, verify email, forget, reset, otp)
export async function ApiLoginRequiest(url, request) {
  try {
    const res = await api.post(`${apiUrl}/${url}`, request);

    if (res?.data?.message === "sent mail otp Successfully") {
      toast.success(res.data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    } else if (res?.data?.message === "OTP verified successfully") {
      toast.success(res.data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    }

    return res;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function ApiUpdateFormData(url, request, token) {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await api.put(`${apiUrl}/${url}`, request, {
      headers: headers,
    });
    toast.success(res?.data?.message || "details updated successfully", {
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
    return res;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

// without use form data use body for use this
export async function ApiPostWithToken(url, token, request) {
  try {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await api.post(`${apiUrl}/${url}`, request, {
      headers: headers,
    });

    return res;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function ApiGetDetails(url, token) {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await api.get(`${apiUrl}/${url}`, {
      headers: headers,
    });
    return res;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function ApiGetDetailsParams(url, token, param) {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await api.get(`${apiUrl}/${url}/${param}`, {
      headers: headers,
    });

    return res;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function ApiDeleteDetails(url, token) {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await api.delete(`${apiUrl}/${url}`, {
      headers: headers,
    });
    return res;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function ApiDeleteParamsDetails(url, token, param) {
  try {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await api.delete(`${apiUrl}/${url}/${param}`, {
      headers: headers,
    });
    return res;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function ApiPostAttendance(url, token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await api.post(
      `${apiUrl}/${url}`,
      {},
      {
        headers: headers,
      }
    );
    return res;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

// create form data

export async function ApiCreateFormData(url, request, token) {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await api.post(`${apiUrl}/${url}`, request, {
      headers: headers,
    });

    return res;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

function handleApiError(error) {
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data.message || "Something went wrong";

    if (status === 400) {
      toast.error(message);
    } else if (status === 404) {
      toast.error(message);
    } else if (status === 401) {
      toast.error("Unauthorized. Please log in again.");
    } else {
      toast.error(`Error ${status}: ${message}`);
    }
  } else if (error.request) {
    toast.error("No response from server. Please try again later.");
  } else {
    toast.error(`Unexpected error: ${error.message}`);
  }
  console.error("API Error:", error);
}
