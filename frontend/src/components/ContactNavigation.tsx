import React from 'react';
import { Link } from 'react-router-dom';

const ContactNavigation = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Link to="/contact/create" className="bg-blue-500 text-white p-4 rounded-md text-center">
        Create
      </Link>
      <Link to="/contact/button2" className="bg-green-500 text-white p-4 rounded-md text-center">
        Edit
      </Link>
      <Link to="/contact/button3" className="bg-red-500 text-white p-4 rounded-md text-center">
   Delete
      </Link>
      <Link to="/contact/button4" className="bg-yellow-500 text-white p-4 rounded-md text-center">
        View
      </Link>
    </div>
  );
}

export default ContactNavigation;
