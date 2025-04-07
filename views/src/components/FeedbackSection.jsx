import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locationDrop from "../assets/locationDrop.png";

const FeedbackSection = () => {
    useEffect(() => {
        const mapContainer = document.getElementById("map");

        if (mapContainer && mapContainer._leaflet_id != null) return;

        const lat = 30.516459;
        const lng = 76.65921;

        const map = L.map("map").setView([lat, lng], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const customIcon = L.icon({
            iconUrl: locationDrop,
            iconSize: [50, 50],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
        });

        L.marker([lat, lng], { icon: customIcon })
            .addTo(map)
            .bindPopup("Chitkara University")
            .openPopup();

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div className="flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 w-[85%] mx-auto py-8 gap-6">
            <div className="w-full lg:w-1/2 px-2 bg-white overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-4">Feedback Form</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">FULL NAME</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">EMAIL ADDRESS</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1"
                            placeholder="Your Email"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">MESSAGE</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 resize-none"
                            placeholder="Your message..."
                            rows={4}
                        />
                    </div>
                    <button type="submit" className="px-12 py-2 bg-zinc-900 text-white rounded-lg">
                        Send Message
                    </button>
                </form>
            </div>

            <div className="w-full lg:w-1/2 flex bg-gray-100 justify-center items-center shadow-sm">
                <div id="map" className="w-[100%] h-[100%] rounded" />
            </div>
        </div>
    );
};

export default FeedbackSection;
