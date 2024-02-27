const getAvatar = (role: RoleProps) => {
    switch (role) {
        case "electrician":
            return "https://static.vecteezy.com/system/resources/previews/020/835/445/original/creative-design-of-electrician-professional-worker-avatar-vector.jpg"
        case "designer":
            return "https://cdn-icons-png.flaticon.com/512/2321/2321108.png"
        case "packer":
            return "https://img1.exportersindia.com/product_images/bc-full/2020/5/7323201/packers-and-movers-services-1590668111-5456116.png"
        case "painter":
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqR_qa7xXdq4V1AXrc1FlHTinkxHdqcKjfAwFr1XNViAzlk3CDrOhMS3vjthYUgAb0vc4&usqp=CAU"
        case "plumber":
            return "https://cdn-icons-png.flaticon.com/512/1995/1995507.png"
        case "user":
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&usqp=CAU"
        default:
            return ""
    }
}

export default getAvatar
