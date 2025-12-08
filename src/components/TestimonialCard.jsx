import React from "react";
import { Star } from "lucide-react";

export default function TestimonialCard({ name, role, content, image }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
            </div>
            <p className="text-gray-600 italic mb-6">&quot;{content}&quot;</p>
            <div className="flex items-center gap-4">
                <img
                    src={image || "https://ui-avatars.com/api/?name=" + name}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h4 className="font-bold text-gray-900">{name}</h4>
                    <p className="text-xs text-gray-500">{role}</p>
                </div>
            </div>
        </div>
    );
}
