import React from "react";
import { Link } from "react-router-dom";

const CompactModeCard = ({ title, value, color, icon: Icon, link }) => (
  <Link
    to={link}
    className={`flex items-center justify-between p-6 text-white ${color} rounded-lg shadow-lg`}
  >
    <div>
      <h2 className="text-xl">{title}</h2>
      <p className="text-sm">{value}</p>
    </div>
    <Icon className="text-4xl" />
  </Link>
);

export default CompactModeCard;
