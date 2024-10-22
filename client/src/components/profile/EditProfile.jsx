import { useEffect, useState } from "react";
import DescriptionEditor from "./Editor";
import { updateUser } from "../../utils/user";
import { useAuth } from "../../hooks/useAuth";

export const EditProfile = ({ closeModal, user, links }) => {
  const [newName, setNewName] = useState(user.username);
  const [description, setDescription] = useState(user?.description);

  const [github, setGithub] = useState(links?.github || "");
  const [linkedin, setLinkedIn] = useState(links?.linkedin || "");
  const [twitter, setTwitter] = useState(links?.twitter || "");

  const [otherLinks, setOtherLinks] = useState([]);
  const { saveUserInfo } = useAuth();

  useEffect(() => {
    if (links?.other && Array.isArray(links.other)) {
      setOtherLinks(links.other);
    } else {
      setOtherLinks([]);
    }
  }, [links]);

  const updateProfile = async (e) => {
    e.preventDefault();

    const socialLinks = {
      ...(github && { github }),
      ...(linkedin && { linkedin }),
      ...(twitter && { twitter }),
    };
    const validOtherLinks = otherLinks.filter((link) => link.url.trim() !== "");

    const updatedLinks = {
      ...socialLinks,
      other: validOtherLinks,
    };

    const updatedUser = await updateUser(user._id, {
      username: newName,
      description,
      links: updatedLinks,
    });

    saveUserInfo(updatedUser);
    closeModal();
  };

  const addOtherLink = () => {
    if (otherLinks.length < 4) {
      setOtherLinks([...otherLinks, { name: "", url: "" }]);
    }
  };

  const removeOtherLink = (index) => {
    setOtherLinks(otherLinks.filter((_, i) => i !== index));
  };

  const updateOtherLink = (index, field, value) => {
    const newLinks = [...otherLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setOtherLinks(newLinks);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative p-4 w-full max-w-3xl max-h-[80vh] overflow-auto">
        <div className="relative bg-gray-50 rounded-lg shadow-lg border-2">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Edit Profile
            </h3>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-900 hover:bg-red-500 hover:text-gray-300 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg className="w-3 h-3" viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type name"
                />
              </div>

              {[
                { label: "Github", value: github, setter: setGithub },
                { label: "LinkedIn", value: linkedin, setter: setLinkedIn },
                { label: "Twitter", value: twitter, setter: setTwitter },
              ].map(({ label, value, setter }) => (
                <div key={label} className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    {label}
                  </label>
                  <input
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    type="url"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder={`Enter ${label.toLowerCase()} URL`}
                  />
                </div>
              ))}

              {otherLinks.map((link, index) => (
                <div key={index} className="col-span-2">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Link Name
                      </label>
                      <input
                        value={link.name}
                        onChange={(e) =>
                          updateOtherLink(index, "name", e.target.value)
                        }
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="e.g., Portfolio, Blog"
                      />
                    </div>
                    <div className="flex-[2]">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        URL
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          value={link.url}
                          onChange={(e) =>
                            updateOtherLink(index, "url", e.target.value)
                          }
                          type="url"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder="Enter URL"
                        />
                        <button
                          type="button"
                          onClick={() => removeOtherLink(index)}
                          className="p-2 hover:bg-red-100 rounded-full"
                        >
                          <svg
                            className="w-5 h-5 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add More Links Button */}
              {otherLinks.length < 4 && (
                <div className="col-span-2">
                  <button
                    type="button"
                    onClick={addOtherLink}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Another Link ({otherLinks.length}/4)
                  </button>
                </div>
              )}

              {/* Description Editor */}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Description
                </label>
                <DescriptionEditor
                  defaultContent={description}
                  onChange={setDescription}
                />
              </div>
            </div>

            <button
              onClick={updateProfile}
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
