import { useEffect, useState } from "react"


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const detailsLoader = ({url, id}) => {
    const [data, setData] = useState({
        id: 0,
        name: "",
        avatar: "",
        details: {
          city: "",
          company: "",
          position: ""
        }
      });
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        delay(1000)
        .then(()=>fetch(url))
        .then(r=>r.json())
        .then(data => {
            setLoading(false);
            setData(data);
        });
    },[id]);
    console.log(data);
    return [data, loading];
}


export const Details = ({info}) => {
    const {id, name} = info;
    const [data, loading] = detailsLoader({
        url: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/" + id +".json",   
        id: id
    })

    
    return(
        <>
            {loading && <div>Loading...</div>}
            <div className="infouser">
                <img alt="img" src={data.avatar} height="30px" width="30px"/>
                <div className="nameuser">{data.name}</div>
                <div>City: {data.details.city}</div>
                <div>Company: {data.details.company}</div>
                <div>Position: {data.details.position}</div>
            </div>
        </>
    )

}