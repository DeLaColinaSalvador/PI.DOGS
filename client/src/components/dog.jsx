export default function Dog({dog}){
    return <div>
        <h1>{dog.name}</h1>
        <img src={dog.image} alt='imagen'/> 
    </div>
}