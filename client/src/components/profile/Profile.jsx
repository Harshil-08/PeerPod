import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EditProfile } from "./EditProfile";
import { getUser } from "../../utils/user";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";

export const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localUser, setLocalUser] = useState({});
  const [links, setLinks] = useState({});
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    getUser(id).then((u) => {
      if (!u) {
        console.log("user undefined");
        window.location.replace("/chat");
        return;
      }
      setLocalUser(u);
      setLinks(u.links ?? {});
    });
  }, [id]);

  // check if there are any links
  const hasAnyLinks = () => {
    const socialLinks = ["github", "linkedin", "twitter"].some(
      (platform) => links?.[platform]
    );
    const otherLinks = Array.isArray(links?.other) && links.other.length > 0;
    return socialLinks || otherLinks;
  };

  const renderSocialLinks = () => {
    const socialPlatforms = ["github", "linkedin", "twitter"];
    return socialPlatforms.map((platform) => {
      if (links?.[platform]) {
        return <Social key={platform} name={platform} url={links[platform]} />;
      }
      return null;
    });
  };

  const renderOtherLinks = () => {
    if (!Array.isArray(links?.other)) return null;

    return links.other.map(
      (link, index) =>
        link?.url && (
          <Social key={`other-${index}`} name={link.name} url={link.url} />
        )
    );
  };

  return (
    <div
      className={`${
        theme && "dark"
      } p-4 grid md:grid-cols-4 gap-2 text-black dark:bg-neutral-900 dark:text-white`}
    >
      <div className="flex flex-col items-center h-fit rounded-lg border border-gray-200/90 dark:border-gray-400/20 bg-white shadow-md py-4 dark:bg-neutral-800">
        <img
          width={100}
          className="object-cover"
          src={localUser.profilePicture}
          alt="User"
        />

        <h2 className="text-md font-semibold my-2">{localUser.username}</h2>

        <div className="mt-2 flex flex-wrap md:flex-row md:items-center gap-2">
          {hasAnyLinks() ? (
            <>
              {renderSocialLinks()}
              {renderOtherLinks()}
            </>
          ) : (
            <p className="text-xs text-gray-600">
              {id === user._id
                ? "Edit your profile to add social links"
                : "No social links available"}
            </p>
          )}
        </div>
        {id === user._id && (
          <div className="flex gap-2 mt-6">
            <button
              onClick={openModal}
              className="flex gap-2 items-center justify-end rounded-lg bg-blue-500 text-sm p-2 text-white transition-all duration-150 ease-in-out hover:bg-blue-600"
            >
              <img width={20} src="edit.svg" alt="edit" /> Edit
            </button>
            <button
              onClick={logout}
              className="flex gap-2 items-center justify-end rounded-lg bg-red-500 text-sm p-2 text-white transition-all duration-150 ease-in-out hover:bg-red-600"
            >
              <img width={20} src="logout.svg" alt="logout" /> Logout
            </button>
          </div>
        )}
      </div>

      <div className="md:col-span-3 overflow-y-auto max-h-[45rem] flex flex-col gap-4 rounded-md p-5 bg-gray-100 border border-black/20 dark:border-gray-400 border-dashed dark:bg-neutral-800">
        <h1 className="text-xl font-bold mb-2">Description</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: localUser?.description || "Nothing to see here...",
          }}
        ></p>
      </div>

      {isModalOpen && (
        <EditProfile closeModal={closeModal} user={user} links={links} />
      )}
    </div>
  );
};

const Social = ({ name, url }) => {
  if (!url) return null;

  const platformConfig = {
    github: {
      condition: url.includes("github.com"),
      bgColor: "bg-black",
      textColor: "text-white",
      icon: "github.svg",
    },
    linkedin: {
      condition: url.includes("linkedin.com"),
      bgColor: "bg-blue-500",
      textColor: "text-white",
      icon: "linkedin.svg",
    },
    twitter: {
      condition: url.includes("x.com") || url.includes("twitter.com"),
      bgColor: "bg-gray-200/50",
      textColor: "text-black",
      icon: "twitter.svg",
    },
  };

  const platform = Object.entries(platformConfig).find(
    ([_, config]) => config.condition
  );

  if (platform) {
    const [_, config] = platform;
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <button
          className={`${config.bgColor} text-xs px-3 py-1.5 font-semibold ${config.textColor} inline-flex items-center space-x-2 rounded-full shadow`}
        >
          <img width={15} src={config.icon} alt="" />
          <span>{name}</span>
        </button>
      </a>
    );
  }

  // For other links
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button className="bg-gray-300 text-xs px-3 py-1.5 font-semibold text-black inline-flex items-center space-x-2 rounded-full shadow">
        <img width={20} src="link.svg" alt="" />
        <span>{name || "Link"}</span>
      </button>
    </a>
  );
};
