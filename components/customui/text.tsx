type text={
    style:string,
    value:string|number,
    clickFunc?:()=>void
}
export const Text =({
    style,
    value,
    clickFunc
}:text)=>{
    return <h6 className={style} onClick={clickFunc}>{value}</h6>
}