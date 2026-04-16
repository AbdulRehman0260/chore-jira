import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../lib/axios'

const PointsCounter = () => {
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const response = await axiosInstance.get('/customers/points');
                setPoints(response.data.points);
            } catch (error) {
                console.error('Error fetching points:', error);
                console.error('Error response:', error.response);
                console.error('Error status:', error.response?.status);
                setPoints(0);
            } finally {
                setLoading(false);
            }
        };

        fetchPoints();
    }, []);

    if (loading) {
        return (
            <span className="text-white text-xs px-2 py-1 bg-brand-primary rounded-xs">
                Loading...
            </span>
        );
    }

    return (
        <span className="text-white text-xs px-2 py-1 bg-brand-primary rounded-xs">
            {points} pts
        </span>
    );
};

export default PointsCounter;
