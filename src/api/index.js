import Service from '../utils/Service';

export function getConfigsByProductId(productId) {
    return Service({
        url: '/manager/getConfigsByProductId',
        params: { productId: productId }
    })
}
export function getAllAndroidPlugins() {
    return Service({
        url: '/manager/getAndroidPlugin ',
        method: 'get'
    })
}
export function addNewAndroidPlugin(data) {
    return Service({
        url: '/manager/addAndroidPlguin',
        data: JSON.stringify(data)
    })
}