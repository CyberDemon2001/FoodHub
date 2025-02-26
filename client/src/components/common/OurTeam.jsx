import React from "react";
import raman from "../../assets/raman.jpg";

const teamMembers = [
  {
    name: "Vaibhav Tyagi",
    role: "Developer",
    image: raman, // Replace with actual image URL
    socials: ["facebook", "twitter", "instagram"],
    position: "top-left",
  },
  {
    name: "Raman Chauhan",
    role: "Developer",
    image: raman, // Replace with actual image URL
    socials: ["facebook", "twitter", "instagram"],
    position: "center",
  },
  {
    name: "Toshika Varshney",
    role: "UI Designer",
    image: raman, // Replace with actual image URL
    socials: ["facebook", "twitter", "instagram"],
    position: "bottom-right",
  },
];

function OurTeam() {
  return (
    <div className="text-start bg-white h-[90vh] relative">
      <h2 className="text-4xl pl-6 py-2 font-bold text-orange-600">Our Team</h2>
      <div className="relative w-full h-[500px] flex justify-center">
        <div className="absolute w-full h-1/4 bg-orange-500 top-2/4 -translate-y-1/2"></div>
        <div className="relative w-full h-full flex items-center justify-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`bg-gray-200 rounded-lg shadow-lg p-5 w-60 h-65 text-center absolute ${
                member.position === "top-left" ? "top-18 left-40" :
                member.position === "center" ? "top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2" :
                "bottom-20 right-40"
              }`}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full rounded-lg mx-auto object-cover border-4 border-gray-100"
              />
              <h3 className="text-lg font-semibold mt-8">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
              <div className="flex justify-center gap-3 text-orange-600">
                {member.socials.map((social, i) => (
                  <span key={i} className="cursor-pointer text-xl">
                    <i className={`fab fa-${social}`}></i>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurTeam;
