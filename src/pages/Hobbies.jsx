import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { Button } from "../components/Button"
import { Modal } from "../components/Modal"
import { ModalForm } from "../components/ModalForm"


function Hobbies() {

    // link api
    const baseApiUrl = import.meta.env.VITE_API_BASE_URL

    const Navigate = useNavigate()

    const [hobbies, setHobbies] = useState([])
    const [newHobby, setNewHobby] = useState("")
    const [editHobby, setEditHobby] = useState("")
    const [editId, setEditId] = useState(null)
    const [hobbyId, setHobbyId] = useState(null)

    // const modal 
    const [showModal, setShowModal] = useState(false)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalLogout, setShowModalLogout] = useState(false)

    // alert
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: ""
    })

    const fetchData = () => {
        axios.get(`${baseApiUrl}/hobby`)
            .then(res => {
                console.log(res.data.data)
                setHobbies(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (!Cookies.get("token")) {
            Navigate("/login")
        }

        // console.log(baseApiUrl)

        fetchData()
    }, [])

    const addHobby = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${baseApiUrl}/hobby`, {
                hobby: newHobby
            })

            setNewHobby("")
            setShowModalAdd(false)
            fetchData()

            setAlert({
                show: true,
                message: "Hobi berhasil ditambahkan",
                type: "success"
            })

            setTimeout(() => {
                setAlert({ show: false, message: "", type: "" })
            }, 3000)

        } catch (err) {
            console.log(err)
        }
    }

    const updateHobby = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${baseApiUrl}/hobby/${editId}`, {
                hobby: editHobby
            })

            setShowModalEdit(false)
            setEditHobby("")
            setEditId(null)
            fetchData()

            setAlert({
                show: true,
                message: "Hobi berhasil diupdate",
                type: "success"
            })

            setTimeout(() => {
                setAlert({ show: false, message: "", type: "" })
            }, 3000)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteHobby = async (id) => {
        try {
            await axios.delete(`${baseApiUrl}/hobby/${id}`)
            fetchData()


            setAlert({
                show: true,
                message: "Hobi berhasil dihapus",
                type: "success"
            })

            setTimeout(() => {
                setAlert({ show: false, message: "", type: "" })
            }, 3000)
        } catch (err) {
            console.log(err)
        }
    }

    const logout = () => {
        Cookies.remove("token");
        navigate("/login");
    }

    return (
        <div className="mx-auto box-border max-w-4xl p-4">

            {alert.show && (
                <div
                    className={`mb-4 px-4 py-3 rounded 
                    ${alert.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                    {alert.message}
                </div>
            )}


            <div className="flex items-center justify-between pt-24">
                <h1 className="text-2xl font-bold mb-4">Tabel Hobi</h1>

                <div className="mb-4">
                    <Button onClick={() => {
                        setShowModalAdd(true)
                    }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {"Add Hobi"}
                    </Button>
                </div>
            </div>

            {/* Tabel */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">No</th>
                        <th className="py-2 px-4 border-b">Hobi</th>
                        <th className="py-2 px-4 border-b">Tanggal buat</th>
                        <th className="py-2 px-4 border-b">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {hobbies.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                            <td className="py-2 px-4 border-b text-center">{item.hobby}</td>
                            <td className="py-2 px-4 border-b text-center">
                                {new Date(item.created_at).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                <Button onClick={() => {
                                    setEditId(item.id)
                                    setEditHobby(item.hobby)
                                    setShowModalEdit(true)
                                }} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                                    {"Edit"}
                                </Button>

                                <Button onClick={() => {
                                    setHobbyId(item.id)
                                    setShowModal(true)
                                }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                    {"Hapus"}
                                </Button>
                            </td>
                        </tr>
                    ))}

                    {hobbies.length === 0 && (
                        <tr className="hover:bg-gray-50">
                            <td colSpan={4} className="py-2 px-4 border-b text-center">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Button className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModalLogout(true)}>{"Logout"}</Button>

            {/* modal hapus */}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                title="Konfirmasi Hapus"
            >
                <p className="mb-6">Yakin ingin menghapus data ini?</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setShowModal(false)}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Batal
                    </button>
                    <button
                        onClick={async () => {
                            await deleteHobby(hobbyId)
                            setShowModal(false)
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Ya, Hapus
                    </button>
                </div>
            </Modal>

            {/* modal tambah */}
            <ModalForm
                show={showModalAdd}
                onClose={() => setShowModalAdd(false)}
                title="Tambah Hobi"
                value={newHobby}
                onChange={setNewHobby}
                onSubmit={addHobby}
                submitLabel="Tambah"
            />

            {/* modal edit */}
            <ModalForm
                show={showModalEdit}
                onClose={() => setShowModalEdit(false)}
                title="Edit Hobi"
                value={editHobby}
                onChange={setEditHobby}
                onSubmit={updateHobby}
                submitLabel="Edit"
            />

            {/* modal logout */}
            <Modal
                show={showModalLogout}
                onClose={() => setShowModalLogout(false)}
                title="Konfirmasi Logout"
            >
                <p className="mb-6">Yakin ingin Logout dari akun ini?</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setShowModalLogout(false)}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Batal
                    </button>
                    <button
                        onClick={() => {
                            logout()
                            setShowModalLogout(false)
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Ya, Logout
                    </button>
                </div>
            </Modal>

        </div >
    )
}

export default Hobbies