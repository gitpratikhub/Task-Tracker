
import Button from './Button'
import {useLocation} from 'react-router-dom'

const Header = ({onAdd, butanstate}) => {
    // const onClick = () => {
    //     console.log('click')
    // }
    const location = useLocation()
    return (
        <header className='header'>
            <h1> Task Tracker </h1>
            {location.pathname==='/' && <Button color={butanstate ? 'Red' : 'green'} text={butanstate ? 'close' : 'Add'} onClick={onAdd}/>}
        </header>
    )
}

export default Header;
