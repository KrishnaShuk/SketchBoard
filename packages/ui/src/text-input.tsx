
interface PropType {
    placeholder: string;
    size: "big" | "small"
}

export default function TextInput({
    placeholder,
    size
}: PropType){
    return <input placeholder={placeholder} style={{
        padding: size === "big" ? 20 : 10,
        margin: size === "big" ? 20 : 10,
        borderColor:"black",
        borderWidth: 1,
    }}></input>
}