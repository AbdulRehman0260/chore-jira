import React, { useState, useEffect, useRef } from 'react'
import { axiosInstance } from '../lib/axios'

const PointsCounter = () => {
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const refreshPointsRef = useRef(null);

    const fetchPoints = async () => {
        try {
            console.log("Fetching points from /customers/points...")
            const response = await axiosInstance.get('/customers/points');
            console.log("Points response:", response.data);
            setPoints(response.data.points);
            console.log(`Points updated to: ${response.data.points}`);
        } catch (error) {
            console.error('Error fetching points:', error);
            console.error('Error response:', error.response);
            console.error('Error status:', error.response?.status);
            setPoints(0);
        } finally {
            setLoading(false);
        }
    };

    // Expose refresh function globally
    refreshPointsRef.current = fetchPoints;

    useEffect(() => {
        fetchPoints();

        // Make refresh function available globally
        window.refreshPoints = fetchPoints;

        return () => {
            delete window.refreshPoints;
        };
    }, []);

    if (loading) {
        return (
            <span className="text-white text-sm px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xs font-medium">
                Loading...
            </span>
        );
    }

    return (
        <span className="text-white text-sm px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xs font-medium">
            {points} pts
        </span>
    );
};

export default PointsCounter;
