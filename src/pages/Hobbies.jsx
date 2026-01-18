import axios from "axios"
import { useEffect, useState } from "react"


function Hobbies() {
    const [hobbies, setHobbies] = useState([])
    const [newHobby, setNewHobby] = useState("")
    const [editHobby, setEditHobby] = useState("")
    const [editId, setEditId] = useState(null)
    const [hobbyId, setHobbyId] = useState(null)

    // const modal 
    const [showModal, setShowModal] = useState(false)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)



    const fetchData = () => {
        axios.get('http://127.0.0.1:8000/api/hobby')
            .then(res => {
                console.log(res.data.data)
                setHobbies(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const addHobby = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://127.0.0.1:8000/api/hobby', {
                hobby: newHobby
            })

            setNewHobby("")
            setShowModalAdd(false)
            fetchData()
        } catch (err) {
            console.log(err)
        }
    }

    const updateHobby = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://127.0.0.1:8000/api/hobby/${editId}`, {
                hobby: editHobby
            })

            setShowModalEdit(false)
            setEditHobby("")
            setEditId(null)
            fetchData()
        } catch (err) {
            console.log(err)
        }
    }

    const deleteHobby = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/hobby/${id}`)
            fetchData()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="mx-auto box-border max-w-4xl p-4">

            <div className="flex items-center justify-between pt-24">
                <h1 className="text-2xl font-bold mb-4">Tabel Hobi</h1>

                <div className="mb-4">
                    <button
                        onClick={() => {
                            setShowModalAdd(true)
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Hobi
                    </button>
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
                                <button
                                    onClick={() => {
                                        setEditId(item.id)
                                        setEditHobby(item.hobby)
                                        setShowModalEdit(true)
                                    }}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setHobbyId(item.id)
                                        setShowModal(true)
                                    }}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Hapus
                                </button>
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


            {/* modal hapus */}
            {
                showModal && (
                    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                            <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
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
                        </div>
                    </div>
                )
            }

            {/* modal tambah */}
            {
                showModalAdd && (

                    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                            <h2 className="text-lg font-bold mb-4">Tambah Hobi</h2>

                            <form onSubmit={addHobby} className="space-y-4">
                                <input
                                    type="text"
                                    value={newHobby}
                                    onChange={(e) => setNewHobby(e.target.value)}
                                    placeholder="Masukkan nama hobi"
                                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                                    required
                                />

                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModalAdd(false)}
                                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                                    >
                                        Batal
                                    </button>

                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                    >
                                        Tambah
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )

            }

            {/* modal edit */}
            {
                showModalEdit && (

                    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                            <h2 className="text-lg font-bold mb-4">Edit Hobi</h2>

                            <form onSubmit={updateHobby} className="space-y-4">
                                <input
                                    type="text"
                                    value={editHobby}
                                    onChange={(e) => setEditHobby(e.target.value)}
                                    placeholder="Masukkan nama hobi"
                                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                                    required
                                />

                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModalEdit(false)}
                                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                                    >
                                        Batal
                                    </button>

                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )

            }

        </div >
    )
}

export default Hobbies