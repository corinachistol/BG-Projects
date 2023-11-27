
export default function Footer() {
    const year = new Date().getFullYear()
    
    console.log(year)

    return (
        <footer>
            <p>Copyright &#169; {year}</p>
        </footer>
    )
}