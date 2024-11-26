import { useEffect, useState } from "react"
import { Details } from "./Details";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const usersLoader = ({url, defaultdata}) => {
    const [data, setData] = useState(defaultdata);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        delay(1000)
        .then(()=>fetch(url))
        .then(r=>r.json())
        .then(data => {
            setLoading(false);
            setData(data)
        });
    },[]);

    return [data, loading];

}

export const UsersList = () => {
    const [data, loading] = usersLoader({
        url: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json",
        defaultdata:[]
    });

    const [showDetails, setShowDetails] = useState(false);

    const [info, setInfo] = useState({
        id:0,
        name:"",
    });
    
    return(
        <div className="details">
             {loading && <div>Loading...</div>}
             <div className="listuser">
                {data.map((item)=> <li key={item.id} onClick={()=> {setInfo(previnfo => ({...previnfo, id:item.id, name: item.name})), setShowDetails(true)}}>{item.name}</li>)}
            </div>
            <div>
                {showDetails && (<Details info={info}/>)}
            </div>
      </div>
    );
}