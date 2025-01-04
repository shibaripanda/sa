import { Center, Loader } from "@mantine/core"
import React from "react"

export const LoaderShow = () => {
    return (
        <Center style={{marginTop: '15vmax'}}>
            <Loader size={45} color="blue" type="dots" />
        </Center>
    )
}