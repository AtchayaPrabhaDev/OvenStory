import  banner from '../assets/banner1.png';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Customize from './pages/Customize';
export default function Banner() {
    const navigate = useNavigate();
    return (
        <div className="banner">
            <div className="banner-img">
                <img src={banner} alt="Banner" />
            </div>
            <div className="banner-button">
                <button className="customize-button" onClick={() => navigate('/customize')}>Customize Your Meal</button>
            </div>
        </div>
    );
}