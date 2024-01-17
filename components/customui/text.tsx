type text={
    style:string,
    value:string|number
}
export const Text =({
    style,
    value
}:text)=>{
    return <h6 className={style}>{value}</h6>
}