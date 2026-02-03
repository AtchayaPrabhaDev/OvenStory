import { Link } from 'react-router-dom';
import Cart from './pages/Cart';
 export default function Navigation({ cartLength }) {
    return (
        <div className='navigation'>
                <div className='navi-bar'>
                    <nav className='nav-bar'>
                        <Link to="/">Home</Link> 
                        <Link to="/customize">Customize</Link>
                        <Link to="/cart">Cart <span className="cart-count">{cartLength}</span></Link>
                    </nav>

            </div>
        </div>
    )
}