import { Link } from "react-router-dom";
export const Profile = () => {
  return (
    <div className="mx-2 mt-5 grid text-black">
      <Link
        to={"/chat"}
        className="px-2 py-1 mb-2 bg-black text-white w-fit rounded-md"
      >
        {"<"} Back
      </Link>
      <div className="flex flex-col md:flex-row rounded-lg border border-gray-400 bg-white p-6">
        <div className="relative">
          <img
            className="border rounded-md object-cover"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="User"
          />
        </div>

        <div className="flex flex-col md:px-6">
          <div className="flex h-8 flex-row">
            <a href="https://github.com/EgoistDeveloper/" target="_blank">
              <h2 className="text-xl font-semibold">Amit Suthar</h2>
            </a>

            <svg
              className="my-auto ml-2 h-5 fill-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
            </svg>
          </div>

          <div className="my-2 flex flex-col md:flex-row gap-1.5">
            <div className="flex flex-row items-center gap-0.5">
              <img width={20} src="usericonhollow.svg" alt="usericon" />
              <div className="text-sm text-gray-400/80 hover:text-gray-400">
                Fullstack Developer
              </div>
            </div>

            <div className="flex flex-row items-center gap-0.5">
              <img width={20} src="pin.svg" alt="pin" />
              <div className="text-sm text-gray-400/80 hover:text-gray-400">
                Istanbul
              </div>
            </div>

            <div className="flex flex-row items-center gap-0.5">
              <img width={20} src="at.svg" alt="at" />
              <div className="text-sm text-gray-400/80 hover:text-gray-400">
                who@am.i
              </div>
            </div>
          </div>

          <div className="mt-2 flex flex-col md:flex-row md:items-center gap-2">
            <Social />
          </div>
        </div>

        <div className="flex flex-grow flex-col mt-4 md:items-end justify-start">
          <div className="flex flex-row space-x-2">
            <button className="flex gap-2 items-center justify-end rounded-md bg-blue-500 py-1.5 px-2 text-white transition-all duration-150 ease-in-out hover:bg-blue-600">
              Edit
              <img width={20} src="edit.svg" alt="edit" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Social = () => {
  return (
    <>
      <Link to={"#"}>
        <button className="bg-black px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded-full">
          <img src="github.svg" alt="github" />
          <span>GitHub</span>
        </button>
      </Link>
    </>
  );
};
