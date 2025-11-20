import { useState, useContext, useRef, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { ContactContext } from "../context/ContactContext";

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

function LocationPicker({ setCoordinates }) {
  useMapEvents({
    click(e) {
      setCoordinates(e.latlng);
    },
  });
  return null;
}

export default function Main() {
  const { user, logout } = useAuth();
  const { contacts, addContact, updateContact, deleteContact } =
    useContext(ContactContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    photo: "",
    lat: null,
    lng: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const notifTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (notifTimer.current) clearTimeout(notifTimer.current);
    };
  }, []);

  const validate = () => {
    const errs = {};
    if (!newContact.name) errs.name = "Name required";
    if (!newContact.phone || !/^\d+$/.test(newContact.phone))
      errs.phone = "Phone must be numbers";
    if (!newContact.email || !/^\S+@\S+\.\S+$/.test(newContact.email))
      errs.email = "Invalid email";
    if (!newContact.address) errs.address = "Address required";
    if (!newContact.photo) errs.photo = "Photo required";
    if (newContact.lat === null || newContact.lng === null)
      errs.location = "Location required";
    return errs;
  };

  const showNotification = (type, message, duration = 3000) => {
    if (notifTimer.current) clearTimeout(notifTimer.current);
    setNotification({ show: true, type, message });
    notifTimer.current = setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
      notifTimer.current = null;
    }, duration);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showNotification("error", "The file must be an image.");
      return;
    }
    if (file.size > 1024 * 1024) {
      showNotification("error", "Maximum size 1MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
    setNewContact({ ...newContact, photo: URL.createObjectURL(file) });
  };

  const handleAddOrEditContact = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showNotification("error", "Check the form data first");
      return;
    }

    try {
      if (editingIndex !== null) {
        updateContact(editingIndex, newContact);
        showNotification("success", "Contact successfully updated!");
      } else {
        addContact(newContact);
        showNotification("success", "Contact successfully added!");
      }

      setNewContact({
        name: "",
        phone: "",
        email: "",
        address: "",
        photo: "",
        lat: null,
        lng: null,
      });
      setPhotoPreview(null);
      setIsModalOpen(false);
      setErrors({});
      setEditingIndex(null);
    } catch {
      showNotification("error", "Failed to save data. Please try again.");
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setNewContact({ ...contacts[index] });
    setPhotoPreview(contacts[index].photo);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteClick = (index) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    try {
      deleteContact(index);
      if (editingIndex === index) {
        setIsModalOpen(false);
        setEditingIndex(null);
      }
      showNotification("success", "Contact successfully deleted!");
    } catch {
      showNotification("error", "Failed to delete contact. Please try again.");
    }
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    showNotification("success", "Logout successful!", 2000);

    setTimeout(() => {
      logout();
    }, 2000);
  };

  return (
    <>
      {notification.show && (
        <div
          className={`fixed bottom-4 right-4 z-[9999] px-4 py-2 rounded-lg shadow-lg max-w-xs ${
            notification.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-rose-600 text-white"
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="text-sm">{notification.message}</div>
        </div>
      )}

      <main className="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-[#0b0b0d] p-6">
        <div className="w-full max-w-7xl">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Welcome, {user?.username || "User"}
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gradient-to-br from-[#f87171] to-[#b91c1c] text-white font-semibold flex items-center gap-2 disabled:opacity-60"
              disabled={isLoggingOut}
            >
              {isLoggingOut && (
                <svg
                  className="w-4 h-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    className="opacity-75"
                  />
                </svg>
              )}
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </header>

          <section className="bg-white dark:bg-[#09090b] rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-slate-900 dark:text-white">
                Contact List
              </h2>
              <button
                onClick={() => {
                  setEditingIndex(null);
                  setNewContact({
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    photo: "",
                    lat: null,
                    lng: null,
                  });
                  setPhotoPreview(null);
                  setErrors({});
                  setIsModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-br from-[#2dd4bf] to-[#6366f1] text-white font-semibold"
                disabled={isLoggingOut}
              >
                Add Contact
              </button>
            </div>

            <input
              type="text"
              placeholder="Search by name..."
              className="w-full px-4 py-3 mb-4 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-teal-300 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoggingOut}
            />

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-white/5">
                    <th className="p-3 text-sm text-slate-700 dark:text-white">
                      Photo
                    </th>
                    <th className="p-3 text-sm text-slate-700 dark:text-white">
                      Name
                    </th>
                    <th className="p-3 text-sm text-slate-700 dark:text-white">
                      Phone
                    </th>
                    <th className="p-3 text-sm text-slate-700 dark:text-white">
                      Email
                    </th>
                    <th className="p-3 text-sm text-slate-700 dark:text-white">
                      Location
                    </th>
                    <th className="p-3 text-sm text-slate-700 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.length ? (
                    filteredContacts.map((c, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 dark:border-white/10"
                      >
                        <td className="p-3">
                          <img
                            src={c.photo}
                            alt={c.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </td>
                        <td className="p-3 text-sm text-slate-900 dark:text-white">
                          {c.name}
                        </td>
                        <td className="p-3 text-sm text-slate-700 dark:text-slate-300">
                          {c.phone}
                        </td>
                        <td className="p-3 text-sm text-slate-700 dark:text-slate-300">
                          {c.email}
                        </td>
                        <td className="p-3 text-sm text-slate-700 dark:text-slate-300">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Map
                          </a>
                        </td>
                        <td className="p-3 text-sm text-slate-700 dark:text-slate-300 flex gap-2">
                          <button
                            onClick={() => handleEditClick(idx)}
                            className="px-2 py-1 bg-yellow-500 rounded text-white"
                            disabled={isLoggingOut}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(idx)}
                            className="px-2 py-1 bg-red-500 rounded text-white"
                            disabled={isLoggingOut}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-3 text-center text-slate-500 dark:text-slate-400"
                      >
                        No contacts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#09090b] p-6 rounded-2xl w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                {editingIndex !== null ? "Edit Contact" : "Add New Contact"}
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                  disabled={isLoggingOut}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}

                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact({ ...newContact, phone: e.target.value })
                  }
                  disabled={isLoggingOut}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white"
                  value={newContact.email}
                  onChange={(e) =>
                    setNewContact({ ...newContact, email: e.target.value })
                  }
                  disabled={isLoggingOut}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}

                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white"
                  value={newContact.address}
                  onChange={(e) =>
                    setNewContact({ ...newContact, address: e.target.value })
                  }
                  disabled={isLoggingOut}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}

                <div>
                  <label className="block text-sm mb-1 text-slate-300">
                    Photo
                  </label>

                  <label
                    htmlFor="photoInput"
                    className="flex items-center gap-2 w-full px-4 py-3 bg-slate-700 border border-slate-600 hover:border-slate-500 rounded-lg text-white cursor-pointer transition"
                  >
                    <svg
                      className="w-5 h-5 opacity-80"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7h4l2-3h6l2 3h4v13H3V7zm9 3a4 4 0 100 8 4 4 0 000-8z"
                      />
                    </svg>

                    <span className="text-sm">Choose Image</span>
                  </label>

                  <input
                    id="photoInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                    disabled={isLoggingOut}
                  />
                </div>

                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                )}
                {errors.photo && (
                  <p className="text-red-500 text-sm">{errors.photo}</p>
                )}

                <div className="h-48">
                  <MapContainer
                    center={[0, 0]}
                    zoom={2}
                    className="h-full w-full"
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {newContact.lat && newContact.lng && (
                      <Marker
                        position={[newContact.lat, newContact.lng]}
                        icon={markerIcon}
                      />
                    )}
                    <LocationPicker
                      setCoordinates={(latlng) =>
                        setNewContact({
                          ...newContact,
                          lat: latlng.lat,
                          lng: latlng.lng,
                        })
                      }
                    />
                  </MapContainer>
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingIndex(null);
                    setNewContact({
                      name: "",
                      phone: "",
                      email: "",
                      address: "",
                      photo: "",
                      lat: null,
                      lng: null,
                    });
                    setPhotoPreview(null);
                    setErrors({});
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-400 text-white"
                  disabled={isLoggingOut}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOrEditContact}
                  className="px-4 py-2 rounded-lg bg-gradient-to-br from-[#2dd4bf] to-[#6366f1] text-white"
                  disabled={isLoggingOut}
                >
                  {editingIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
