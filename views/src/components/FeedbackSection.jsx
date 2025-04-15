import React, { useEffect, useContext } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locationDrop from "../assets/iconImages/location.svg";
import { StoreContext } from "../Context/StoreContext";

const FeedbackSection = () => {
    const { feedback, setFeedback, handleFeedback } = useContext(StoreContext);


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
        <div className="flex flex-col lg:flex-row px-8 sm:px-6 lg:px-38 mx-auto py-8 gap-6">
            <div className="w-full lg:w-1/2 bg-white overflow-y-auto">
                <form className="space-y-6" onSubmit={handleFeedback}>
                    <div>
                        <label className="block mb-1 text-xs font-bold">FULL NAME</label>
                        <input
                            type="text"
                            className="w-full pl-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1"
                            placeholder="Your Name"
                            value={feedback.name}
                            onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-xs font-bold">EMAIL ADDRESS</label>
                        <input
                            type="email"
                            className="w-full pl-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1"
                            placeholder="Your Email"
                            value={feedback.to}
                            onChange={(e) => setFeedback({ ...feedback, to: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-xs font-bold">MESSAGE</label>
                        <textarea
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 resize-none"
                            placeholder="Your message"
                            rows={4}
                            value={feedback.message}
                            onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="px-12 py-2 bg-zinc-900 text-white rounded-lg">
                        Send Message
                    </button>
                </form>
            </div>

            <div className="h-[19.4375rem] lg:h-auto lg:w-1/2 flex bg-gray-100 justify-center items-center shadow-sm">
                <div id="map" className="w-[100%] h-[100%]" />
            </div>
        </div>
    );
};

export default FeedbackSection;
