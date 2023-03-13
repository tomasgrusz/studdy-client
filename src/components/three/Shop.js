import { Html, useGLTF } from "@react-three/drei";
import { useContext, useState } from "react";
import Axios from "axios";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'
import { MeshPhongMaterial } from "three";
import ToggleSwitch from "../misc/ToggleSwitch";
import { UserContext } from "../account/UserInfo";

const ShopDetectors = ({ setItem }) => {

    const { nodes, materials } = useGLTF("/studio.glb");

    const [transparency, setTransparency] = useState(false)

    const detectorMaterialPaint = new MeshPhongMaterial({ color: "#00FFFF", opacity: 0.5, transparent: true, visible: transparency });
    const detectorMaterialFurniture = new MeshPhongMaterial({ color: "#FF0000", opacity: 0.5, transparent: true, visible: transparency });
    const detectorMaterialBed = new MeshPhongMaterial({ color: "#FF6600", opacity: 0.5, transparent: true, visible: transparency });
    const detectorMaterialDesk = new MeshPhongMaterial({ color: "#00FF00", opacity: 0.5, transparent: true, visible: transparency });
    const detectorMaterialSmall = new MeshPhongMaterial({ color: "#FF00FF", opacity: 0.5, transparent: true, visible: transparency });
    const detectorMaterialLarge = new MeshPhongMaterial({ color: "#FFFF00", opacity: 0.5, transparent: true, visible: transparency });

    return (
        <group onDoubleClick={(e) => setItem(e.object)} onClick={(e) => { if (transparency) { setItem(e.object) } }}>
            <Html position={[0.1, 2.65, 2.85]} rotation={[0, Math.PI / 2, 0]} scale={0.25} transform>
                <ToggleSwitch toggle={transparency} toggleFunction={setTransparency} />
            </Html>
            <mesh
                receiveShadow
                geometry={nodes.Cube005.geometry}
                material={detectorMaterialPaint}
                position={[1.575, 2.64, 0.12]}
                rotation={[1.57, 0, 0]}
                scale={[1.15, 1, 0.16]}
                name='paint1'
            />
            <mesh
                receiveShadow
                geometry={nodes.Cube005.geometry}
                material={detectorMaterialPaint}
                position={[0.12, 2.65, 1.63]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={[0.17, 1.05, 1]}
                name='paint2'
            />

            <mesh
                receiveShadow
                geometry={nodes.Bookshelf.geometry}
                material={detectorMaterialFurniture}
                position={[2.51, 0.75, 0.42]}
                rotation={[0, -Math.PI / 2, Math.PI]}
                scale={[1.05, 0.5, 1.02]}
                name='furniture1'
            />

            <mesh
                receiveShadow
                geometry={nodes.Bed_Sheet.geometry}
                material={detectorMaterialBed}
                position={[1.5, 1.3, 2.47]}
                scale={[1.45, 1.05, 0.95]}
                name='bed1'
            />

            <mesh
                receiveShadow
                geometry={nodes.Cube007.geometry}
                material={detectorMaterialDesk}
                position={[0.91, 1.02, 0.43]}
                rotation={[0, Math.PI / 2, 0]}
                name='desk1'
            />
            <mesh
                receiveShadow
                geometry={nodes.Cube007.geometry}
                material={detectorMaterialDesk}
                position={[0.46, 1.03, 1.71]}
                rotation={[0, Math.PI / 2, 0]}
                name='desk2'
            />

            <mesh
                receiveShadow
                geometry={nodes.Cube011.geometry}
                material={detectorMaterialSmall}
                position={[2.57, 1.93, 0.45]}
                rotation={[0, -Math.PI / 2, 0]}
                name='small1'
            />
            <mesh
                receiveShadow
                geometry={nodes.Cube011.geometry}
                material={detectorMaterialSmall}
                position={[2.86, 1.93, 0.46]}
                rotation={[0, -Math.PI / 2, 0]}
                name='small2'
            />
            <mesh
                receiveShadow
                geometry={nodes.Cube011.geometry}
                material={detectorMaterialSmall}
                position={[0.38, 1.98, 1.73]}
                rotation={[0, -Math.PI / 2, 0]}
                name='small3'
            />

            <mesh
                receiveShadow
                geometry={nodes.Cube018.geometry}
                material={detectorMaterialLarge}
                position={[0.38, 2.07, 0.62]}
                rotation={[0, -Math.PI / 2, 0]}
                name='large1'
            />
            <mesh
                receiveShadow
                geometry={nodes.Cube018.geometry}
                material={detectorMaterialLarge}
                position={[0.38, 2.07, 1.24]}
                rotation={[0, -Math.PI / 2, 0]}
                name='large2'
            />
            <mesh
                receiveShadow
                geometry={nodes.Cube018.geometry}
                material={detectorMaterialLarge}
                position={[2.19, 2.01, 0.43]}
                rotation={[0, -Math.PI / 2, 0]}
                name='large3'
            />
        </group >
    )
}

const ItemOptions = ({ object, studio, setItem, setStudio, items }) => {

    const { user, setUser } = useContext(UserContext);

    const owned = studio ? studio.owned : [];
    const name = object.name.toString();
    const desk = (name === 'desk1' || name === 'desk2') ? 'desk' : null;
    const small = (name === 'small1' || name === 'small2' || name === 'small3') ? 'small' : null;
    const large = (name === 'large1' || name === 'large2' || name === 'large3') ? 'large' : null;
    const paint = (name === 'paint1' || name === 'paint2') ? 'paint' : null;
    const furniture = (name === 'furniture1') ? 'furniture' : null;
    const bed = (name === 'bed1') ? 'bed' : null;
    const type = desk || small || large || paint || furniture || bed;
    const typeItems = items.filter(item => item.type === type);

    const handleClick = async (id, price) => {

        if (owned.includes(id)) {
            let studioItems = studio[type];
            const pos = name.match(/\d+/)[0];

            if (studioItems[pos - 1] === id) {
                studioItems[pos - 1] = 0;
            } else {
                studioItems[pos - 1] = id;
            }

            const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/studio`, {
                item: {
                    id: studioItems[pos - 1],
                    position: {
                        type: type,
                        index: pos - 1
                    }
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            if (response.data.studio) {
                await setStudio(response.data.studio);
            } else {
                alert(`Something went wrong!`);
            }

            setItem(null)

        } else if (price <= user.currency) {

            const pos = name.match(/\d+/)[0];

            const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/studio`, {
                item: {
                    id: id,
                    position: {
                        type: type,
                        index: pos - 1
                    }
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            if (response.data.studio) {
                await setStudio(response.data.studio);
                await setUser(() => {
                    let temp = user;
                    temp.currency = response.data.currency;
                    return temp;
                })
            } else {
                alert(`Something went wrong!`);
            }

            setItem(null)

        } else {
            alert('Not enough intelligems!')
            setItem(null)
        }
    }

    if (object && studio) {
        return (
            <group>
                <Html position={object.position} style={{ width: '20ch' }}>
                    <div className="options-container">
                        {typeItems.map(item => <div>
                            <span onClick={e => handleClick(item._id, item.price)}>{owned.includes(item._id) ? '' : <AiOutlineShoppingCart />}{item.name}{owned.includes(item._id) ? '' : <><span className='currency-icon' style={{
                                width: '24px', height: '24px', padding: '0', border: 'none', marginLeft: "auto"
                            }} /><label style={item.price > user.currency ? { color: 'var(--danger-color)' } : {}}>{item.price}</label></>}</span>
                        </div>)}
                        <span className="danger" onClick={e => setItem(null)}><MdOutlineCancel />Close</span>
                    </div>
                </Html>
            </group>
        )
    }
}

const Shop = ({ studio, setStudio, items }) => {

    const [item, setItem] = useState(null)

    return (
        <group>
            <ShopDetectors setItem={setItem} />
            {item ? <ItemOptions object={item} studio={studio} setItem={setItem} setStudio={setStudio} items={items} /> : ''}
        </group>
    )
}

export { Shop }