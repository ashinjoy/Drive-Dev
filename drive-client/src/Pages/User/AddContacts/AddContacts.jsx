import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveContacts } from '../../../Features/User/userActions';

function AddContacts() {

    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({
      name: '',
      phoneNumber: '',
      email: '',
      relationship: '',
    });
  
    const [isFormVisible, setIsFormVisible] = useState(false);

    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user)

  
    const handleInputChange = (e) => {
      setNewContact({ ...newContact, [e.target.name]: e.target.value });
    };
  
    const addContact = () => {
      if (newContact.name && newContact.phoneNumber) {
        setContacts([...contacts, newContact]);
        dispatch(saveContacts({...newContact,userId:user?.id}))
        setNewContact({ name: '', phoneNumber: '', email: '', relationship: '' });
        setIsFormVisible(false);
      }
    };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
    {/* Create Contact Button */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Emergency Contacts</h1>
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        {isFormVisible ? 'Cancel' : 'Create Contact'}
      </button>
    </div>

    {/* Add Contact Form */}
    {isFormVisible && (
      <div className="mb-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newContact.name}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={newContact.phoneNumber}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email (Optional)"
          value={newContact.email}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="relationship"
          value={newContact.relationship}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Relationship</option>
          <option value="Parent">Parent</option>
          <option value="Sibling">Sibling</option>
          <option value="Friend">Friend</option>
          <option value="Spouse">Spouse</option>
        </select>
        <button
          onClick={addContact}
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
        >
          Save Contact
        </button>
      </div>
    )}

    {/* List of Contacts */}
    <div>
      {contacts.length > 0 ? (
        <ul className="space-y-4">
          {contacts.map((contact, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm"
            >
              <div>
                <p className="text-lg font-medium text-gray-800">{contact.name}</p>
                <p className="text-gray-500">{contact.relationship}</p>
                <p className="text-gray-500">{contact.phoneNumber}</p>
                {contact.email && <p className="text-gray-500">{contact.email}</p>}
              </div>
              <button
                onClick={() => setContacts(contacts.filter((_, i) => i !== index))}
                className="text-red-500 hover:text-red-600 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No emergency contacts added yet.</p>
      )}
    </div>
  </div>
  )
}

export default AddContacts
