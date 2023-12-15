function Pinnedbuble({data}) {
    console.log(data)
    return (
        <div className="flex">
            <div className="ms-7 border border-2 border-black rounded-md px-3 py-2 mb-4 w-fit-content">
                {data.msg}
            </div>

        </div>
    )
}

export default Pinnedbuble