import React, { useState } from 'react';

function Address() {
    const [address, setAddress] = useState(null);
    const [form, setForm] = useState({ classNumber: '', building: '', floor: '' });
    const [isEditable, setIsEditable] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAddress(form);
        setForm({ classNumber: '', building: '', floor: '' });
        setIsEditable(false);
    };

    const handleEdit = () => {
        setForm(address);
        setAddress(null);
        setIsEditable(true);
    };

    const handleRemove = () => {
        setAddress(null);
        setIsEditable(true);
    };

    return (
        <div className="bg-gray-100 px-6 py-2 rounded-lg shadow-l">
            {/* Title */} 
            <h1 className="text-3xl pb-2 font-bold text-gray-800 text-center">Manage Address</h1>

            <div className="grid md:grid-cols-2 gap-25">
                {/* Form Section */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-3 text-gray-700">Add Address</h3>
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="flex flex-col">
                            <label htmlFor="classNumber" className="text-lg text-gray-600">Room Number:-</label>
                            <input type="text" id="classNumber" name="classNumber" value={form.classNumber} onChange={handleChange} disabled={!isEditable} className="p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="building" className="mb-1 text-lg text-gray-600">Building:-</label>
                            <input type="text" id="building" name="building" value={form.building} onChange={handleChange} disabled={!isEditable} className="p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="floor" className="mb-1 text-lg text-gray-600">Floor:</label>
                            <input type="text" id="floor" name="floor" value={form.floor} onChange={handleChange} disabled={!isEditable} className="p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200" />
                        </div>
                        <button type="submit" disabled={!isEditable} className={`w-full mt-4 py-2 text-lg rounded-md transition-all duration-200 ${isEditable ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}>Submit</button>
                    </form>
                </div>

                {/* Saved Address Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Saved Address</h3>
                    {address ? (
                        <div className="p-4 bg-gray-50 rounded-lg border">
                            <p className="mb-4 text-lg text-gray-800">Room Number:-{address.classNumber}, <br></br>{address.building}, <br></br>{address.floor}-Floor</p>
                            <div className="flex justify-between">
                                <button onClick={handleEdit} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-all duration-200">Edit</button>
                                <button onClick={handleRemove} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all duration-200">Remove</button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-lg">No address saved.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Address;
