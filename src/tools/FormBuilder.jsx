import { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { getDoc, updateDoc, deleteField } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import Button from '../components/Button';
import React from 'react';

export default function FormBuilder({ triggerRerender, modalStep, setModalStep }) {
    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [dataOptions, setDataOptions] = useState([]);
    const [selectedData, setSelectedData] = useState('');
    const [editData, setEditData] = useState({});
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);


    // New Document Creation Modal state
    const [showNewDocumentModal, setShowNewDocumentModal] = useState(false);
    const [newAnswerSetName, setNewAnswerSetName] = useState('');
    const [secondaryKeys, setSecondaryKeys] = useState([]);
    const [newSecondaryKey, setNewSecondaryKey] = useState('');
    const [arrayOptions, setArrayOptions] = useState([]);
    const [selectedArray, setSelectedArray] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [primaryFields, setPrimaryFields] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [deleteMode, setDeleteMode] = useState('');
    const [showAddSiteModal, setShowAddSiteModal] = useState(false);
    const [newSiteName, setNewSiteName] = useState('');
    const [sites, setSites] = useState([]);
    const [refreshSites, setRefreshSites] = useState(false);
    const [showViewSites, setShowViewSites] = useState(false);
    const [showAddSiteForm, setShowAddSiteForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState('');
    const [siteOptions, setSiteOptions] = useState([]);

    const [newSpeciesName, setNewSpeciesName] = useState('');
    const [species, setSpecies] = useState([]);
    const [refreshSpecies, setRefreshSpecies] = useState(false);
    const [showViewSpecies, setShowViewSpecies] = useState(false);
    const [showAddSpeciesModal, setShowAddSpeciesModal] = useState(false);
    const [speciesOptions, setSpeciesOptions] = useState([]);
    const [showAddSpeciesForm, setShowAddSpeciesForm] = useState(false);
    const [selectedCritter, setSelectedCritter] = useState('');

    const [newPrimary, setNewPrimary] = useState('');
    const [newGenus, setNewGenus] = useState('');
    const [newSpecies, setNewSpecies] = useState('');
    const [showAddArrayModal, setShowAddArrayModal] = useState(false);
    const [newArrayName, setNewArrayName] = useState('');
    const [primaryValues, setPrimaryValues] = useState([]);
    const [newPrimaryValue, setNewPrimaryValue] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [messageBox, setMessageBox] = useState({ show: false, text: '' });

    const critterOptions = ["Lizard", "Mammal", "Snake", "Amphibian", "Turtle"];

    useEffect(() => {
        if (modalStep === 3) fetchDocuments();
    }, [modalStep]);


    useEffect(() => {
        if (refreshSites) {
            fetchSites();
            setRefreshSites(false);
        }
    }, [refreshSites]);

    useEffect(() => {
        if (refreshSpecies) {
            fetchSpecies();
            setRefreshSpecies(false);
        }
    }, [refreshSpecies]);

    const handleCritterSelection = (critterName) => {
        setSelectedCritter(critterName);
    };

    const fetchDocuments = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'AnswerSet'));
            const tempDocuments = [];
            const tempArrayOptions = [];

            querySnapshot.forEach((docSnapshot) => {
                const docData = docSnapshot.data();
                tempDocuments.push({ ...docData, docId: docSnapshot.id }); // Store full documents for modifying
                if (docData.set_name && docData.set_name.endsWith("Array")) {
                    tempArrayOptions.push({
                        name: docData.set_name,
                        docId: docSnapshot.id,
                    });
                }
            });

            setDocuments(tempDocuments); // Store fetched documents
            setArrayOptions(tempArrayOptions); // Store array options for dropdown
            console.log('Fetched Documents:', tempDocuments);
            console.log('Array Options for Dropdown:', tempArrayOptions);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    const handleArraySelection = async (e) => {
        const arrayName = e.target.value;
        const selected = arrayOptions.find(array => array.name === arrayName);
        setSelectedArray(selected);
        setPrimaryFields([]);
        setSelectedField(null);

        if (selected && selected.docId && deleteMode === 'field') {
            try {
                const docRef = doc(db, 'AnswerSet', selected.docId);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const answers = docSnapshot.data().answers || [];
                    const primaryFields = answers.map(field => field.primary).filter(Boolean);
                    setPrimaryFields(primaryFields);
                    console.log("Primary fields:", primaryFields);
                }
            } catch (error) {
                console.error('Error fetching primary fields:', error);
            }
        }
    };

    const handleDeleteArrayClick = async () => {
        if (arrayOptions.length === 0) {
            await fetchDocuments(); // Ensure arrays are loaded
        }
        setShowDeleteConfirm(true); // Open delete confirmation modal
        setDeleteMode(''); // Reset the delete mode
    };

    const confirmDeleteArray = async () => {
        if (selectedArray) {
            const { docId, name } = selectedArray;

            try {
                const docRef = doc(db, 'AnswerSet', docId);
                await deleteDoc(docRef);

                setArrayOptions((prevArrayOptions) =>
                    prevArrayOptions.filter((array) => array.docId !== docId)
                );

                setSelectedArray(null);
                triggerRerender();
                setMessageBox({ show: true, text: ` ${name} deleted successfully.` });
            } catch (error) {
                console.error('Error deleting document:', error);
                setMessageBox({ show: true, text: 'Failed to delete the document.' });
            } finally {
                setShowDeleteConfirm(false);
            }
        }
    };




    const renderDeleteArrayModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-neutral-900 dark:text-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">Delete Options</h2>
                <p className="text-sm text-gray-600 dark:text-neutral-400 mb-4 text-center">
                    Delete entire array will allow you to delete the array document in its entirety and delete array field will let you delete a primary field from your array of choice.
                </p>
                <div className="flex flex-col mb-4">
                    <Button
                        onClick={() => setDeleteMode('array')}
                        text="Delete Entire Array"
                        className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center w-full mb-2"
                    />
                    <Button
                        onClick={() => setDeleteMode('field')}
                        text="Delete Array Field"
                        className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center w-full"
                    />
                </div>

                {deleteMode && (
                    <>
                        <select
                            className="mb-4 p-2 border rounded w-full"
                            value={selectedArray ? selectedArray.name : ""}
                            onChange={handleArraySelection}
                        >
                            <option value="" disabled>Select an array</option>
                            {arrayOptions.map((array, index) => (
                                <option key={index} value={array.name}>
                                    {array.name}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                {deleteMode === 'field' && primaryFields.length > 0 && (
                    <select
                        className="mb-4 p-2 border rounded w-full"
                        value={selectedField || ""}
                        onChange={(e) => setSelectedField(e.target.value)}
                    >
                        <option value="" disabled>Select a primary field</option>
                        {primaryFields.map((field, index) => (
                            <option key={index} value={field}>{field}</option>
                        ))}
                    </select>
                )}

                <div className="flex justify-end space-x-2">
                    <Button
                        onClick={() => {
                            setShowDeleteConfirm(false);
                            setDeleteMode('');
                        }}
                        text="Cancel"
                        className="bg-red text-white px-4 py-2 rounded mb-2"
                    />
                    {deleteMode === 'array' ? (
                        <Button
                            onClick={confirmDeleteArray}
                            text="Delete Array"
                            className="bg-red text-white px-6 py-3 rounded w-full"
                            disabled={!selectedArray}
                        />
                    ) : (
                        <Button
                            onClick={confirmDeletePrimaryField}
                            text="Delete Field"
                            className="bg-red text-white px-6 py-3 rounded w-full"
                            disabled={!selectedField}
                        />
                    )}
                </div>
            </div>
        </div>
    );

    const handleAddArrayClick = () => {
        setShowAddArrayModal(true);
    };


    const handleAddPrimaryValue = () => {
        if (newPrimaryValue.trim() !== '') {
            setPrimaryValues([...primaryValues, newPrimaryValue.trim()]);
            setNewPrimaryValue('');
        }
    };

    const handleAddSecondaryKeyArray = () => {
        if (newSecondaryKey.trim() !== '') {
            setSecondaryKeys([...secondaryKeys, newSecondaryKey.trim()]);
            setNewSecondaryKey('');
        }
    };

    const handleSubmitNewArray = async () => {
        if (newArrayName.trim() === '' || primaryValues.length === 0) {
            setMessageBox({ show: true, text: 'Please provide an array name and at least one primary value.' });
            return;
        }

        try {
            // Join secondary keys into a single string separated by commas
            const secondaryKeysString = secondaryKeys.join(', ');

            await addDoc(collection(db, 'AnswerSet'), {
                set_name: newArrayName,
                answers: primaryValues.map((value) => ({ primary: value })),
                secondary_keys: secondaryKeysString, // Store as a string
                date_modified: Date.now(), // Include date_modified
            });

            setMessageBox({ show: true, text: 'Array added successfully.' });
            setNewArrayName('');
            setPrimaryValues([]);
            setSecondaryKeys([]);
            setShowAddArrayModal(false);
            triggerRerender(); // Refresh the UI
        } catch (error) {
            console.error('Error adding new array:', error);
            setMessageBox({ show: true, text: 'Failed to add the array.' });
        }
    };

    const confirmDeletePrimaryField = async () => {
        if (selectedArray && selectedArray.docId && selectedField) {
            try {
                const docRef = doc(db, 'AnswerSet', selectedArray.docId);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const updatedAnswers = data.answers.filter(field => field.primary !== selectedField);

                    await setDoc(docRef, { ...data, answers: updatedAnswers });
                    triggerRerender();
                    alert(`Field ${selectedField} deleted successfully.`);
                    setPrimaryFields(updatedAnswers.map(field => field.primary).filter(Boolean));
                    setSelectedField(null);
                }
            } catch (error) {
                console.error('Error deleting field:', error);
                alert('Failed to delete the field.');
            } finally {
                setShowDeleteConfirm(false);
            }
        }
    };

    const handleDocumentClick = (doc) => {
        setSelectedDocument(doc);
        const availableDataOptions = doc.answers ? doc.answers.map(answer => answer.primary) : [];
        setDataOptions(availableDataOptions);

        if (availableDataOptions.length > 0) {
            setSelectedData(availableDataOptions[0]);
            handleDataSelection(availableDataOptions[0]);
        } else {
            setEditData({});
        }

        setEditModalVisible(true);
    };


    const handleDataSelection = (data) => {
        const selectedAnswer = selectedDocument.answers.find(answer => answer.primary === data);

        // If the selected document's name ends with "Species", set genus and species separately
        if (selectedDocument.set_name.endsWith("Species") && selectedAnswer) {
            setEditData({
                primary: selectedAnswer.primary,
                genus: selectedAnswer.secondary?.Genus || '',
                species: selectedAnswer.secondary?.Species || '',
            });
        } else {
            setEditData(selectedAnswer || {});
        }
    };

    const handleEditChange = (key, value) => {
        setEditData((prevEditData) => ({
            ...prevEditData,
            [key]: value
        }));
    };

    const renderEditDataFields = () => {
        if (!editData || Object.keys(editData).length === 0) {
            return <p>No data available to edit.</p>;
        }

        if (selectedDocument && selectedDocument.set_name.endsWith("Species")) {
            return (
                <div>
                    <div className="flex flex-col">
                        <label className="text-md">Primary</label>
                        <input
                            type="text"
                            className="border p-2 rounded"
                            value={editData.primary}
                            onChange={(e) => handleEditChange("primary", e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-md">Genus</label>
                        <input
                            type="text"
                            className="border p-2 rounded"
                            value={editData.genus}
                            onChange={(e) => handleEditChange("genus", e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-md">Species</label>
                        <input
                            type="text"
                            className="border p-2 rounded"
                            value={editData.species}
                            onChange={(e) => handleEditChange("species", e.target.value)}
                        />
                    </div>
                </div>
            );
        }
        return Object.entries(editData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
                <label className="text-md">{key}</label>
                <input
                    type="text"
                    className="border p-2 rounded"
                    value={value}
                    onChange={(e) => handleEditChange(key, e.target.value)}
                />
            </div>
        ));
    };

    const submitChanges = async () => {
        if (selectedDocument && selectedData) {
            try {
                const docRef = doc(db, 'AnswerSet', selectedDocument.docId);

                const updatedAnswers = selectedDocument.answers?.map((answer) => {
                    if (answer.primary === selectedData) {
                        const updatedAnswer = {
                            primary: editData.primary || answer.primary,
                        };

                        // Add secondary fields only if the document is a species document
                        if (selectedDocument.set_name.endsWith("Species")) {
                            updatedAnswer.secondary = {
                                Genus: editData.genus || answer.secondary?.Genus || "",
                                Species: editData.species || answer.secondary?.Species || "",
                            };
                        }

                        return updatedAnswer;
                    }
                    return answer;
                }) || [];

                await updateDoc(docRef, {
                    answers: updatedAnswers,
                });

                console.log(`Document ${selectedDocument.set_name} updated successfully in Firebase.`);
                triggerRerender();

                // Show the success popup
                setShowSuccessPopup(true);

                // Close the edit modal after saving
                setEditModalVisible(false);

            } catch (error) {
                console.error("Error updating document in Firebase:", error);
                alert("Failed to update the document.");
            }
        } else {
            alert("Please select a document and data to update.");
        }
    };

    const handleAddSecondaryKey = () => {
        if (newSecondaryKey.trim() !== '') {
            setSecondaryKeys([...secondaryKeys, newSecondaryKey]);
            setNewSecondaryKey('');
        }
    };

    const handleSubmitNewDocument = async () => {
        const docRef = collection(db, 'AnswerSet');
        await addDoc(docRef, { set_name: newAnswerSetName, secondary_keys: secondaryKeys });
        setShowNewDocumentModal(false);
        triggerRerender();
    };

    const handleAddSite = () => {
        setShowAddSiteModal(true); // Open the "Add Site" modal
        setShowAddSiteForm(false);  // Reset to not show the form initially
        setShowViewSites(false);    // Reset to not show the view list initially
        setSelectedProject('');     // Reset the project selection
    };

    const handleAddSpecies = () => {
        setShowAddSpeciesModal(true);
        setShowAddSpeciesForm(false);
        setSelectedProject('');
        setSelectedCritter('');
    };

    const fetchSpeciesForProjectAndCritter = async () => {
        const projectCritterSetName = `${selectedProject}${selectedCritter}Species`; // e.g., GatewayLizardSpecies

        try {
            const q = query(collection(db, 'AnswerSet'), where('set_name', '==', projectCritterSetName));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnapshot = querySnapshot.docs[0];
                const data = docSnapshot.data();
                const speciesList = data.answers.map(answer => answer.primary); // Assuming each answer entry has a `primary` field for species name

                setSpeciesOptions(speciesList); // Set fetched species list
                console.log(`Fetched species for ${projectCritterSetName}:`, speciesList);
            } else {
                console.error(`Document with set_name ${projectCritterSetName} does not exist.`);
                setSpeciesOptions([]); // Clear if no document found
            }
        } catch (error) {
            console.error(`Error fetching species for ${projectCritterSetName}:`, error);
        }
    };

    const fetchSites = async () => {
        try {
            const sitesSnapshot = await getDocs(collection(db, 'Sites')); // Ensure 'Sites' is the correct collection name
            const siteList = sitesSnapshot.docs.map(doc => doc.data().name);
            setSites(siteList);
        } catch (error) {
            console.error('Error fetching sites:', error);
        }
    };

    const fetchSitesForProject = async (projectName) => {
        const projectSetName = `${projectName}Sites`; // Construct the value to match in the `set_name` field

        try {
            // Query the AnswerSet collection to find the document with set_name equal to projectSetName
            const q = query(collection(db, 'AnswerSet'), where('set_name', '==', projectSetName));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnapshot = querySnapshot.docs[0]; // Assuming there's only one document per project

                const data = docSnapshot.data();
                const answers = data.answers || {}; // Retrieve answers map
                const siteNames = Object.values(answers).map((entry) => entry.primary); // Extract primary fields

                setSiteOptions(siteNames); // Populate site options with primary field values
                console.log(`Fetched sites for project ${projectName}:`, siteNames);
            } else {
                console.error(`Document with set_name ${projectSetName} does not exist in the AnswerSet collection.`);
                setSiteOptions([]); // Clear sites if no matching document is found
            }
        } catch (error) {
            console.error(`Error fetching sites for project ${projectName}:`, error);
        }
    };



    const handleProjectSelection = (projectName) => {
        setSelectedProject(projectName);
        fetchSitesForProject(projectName); // Populate site options for the selected project
    };

    const renderExistingSites = () => {
        return (
            <ul className="space-y-2">
                {siteOptions.map((site, index) => (
                    <li key={index} className="text-black-800">{site}</li>
                ))}
            </ul>
        );
    };



    const addNewSite = async () => {
        if (selectedProject && newSiteName.trim()) {
            try {
                const projectSetName = `${selectedProject}Sites`; // Construct the document identifier

                // Query to find the specific document in the AnswerSet collection
                const q = query(collection(db, 'AnswerSet'), where('set_name', '==', projectSetName));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docSnapshot = querySnapshot.docs[0]; // Get the first matching document
                    const docRef = doc(db, 'AnswerSet', docSnapshot.id); // Reference to the correct document

                    // Update the `answers` field with the new site name
                    await updateDoc(docRef, {
                        answers: [...docSnapshot.data().answers, { primary: newSiteName }]
                    });

                    console.log(`Site "${newSiteName}" added to ${projectSetName} successfully.`);
                    setNewSiteName(''); // Clear input field
                    fetchSitesForProject(selectedProject); // Refresh site list to include the new site
                } else {
                    console.error(`Document with set_name ${projectSetName} does not exist in the AnswerSet collection.`);
                }
            } catch (error) {
                console.error(`Error adding new site to ${selectedProject}:`, error);
                alert('Failed to add the site.');
            }
        } else {
            alert("Please select a project and enter a site name.");
        }
    };

    const addNewSpecies = async () => {
        if (selectedProject && selectedCritter && newPrimary.trim() && newGenus.trim() && newSpecies.trim()) {
            try {
                const projectSetName = `${selectedProject}${selectedCritter}Species`;
                const q = query(collection(db, 'AnswerSet'), where('set_name', '==', projectSetName));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docSnapshot = querySnapshot.docs[0];
                    const docRef = doc(db, 'AnswerSet', docSnapshot.id);

                    const newEntry = {
                        primary: newPrimary,
                        secondary: {
                            Genus: newGenus,
                            Species: newSpecies,
                        }
                    };

                    await updateDoc(docRef, {
                        answers: [...docSnapshot.data().answers, newEntry]
                    });

                    console.log(`Species "${newPrimary}" added to ${projectSetName} successfully.`);
                    setNewPrimary('');
                    setNewGenus('');
                    setNewSpecies('');
                    setShowAddSpeciesForm(false);
                    setShowAddSpeciesModal(false);
                    triggerRerender();
                } else {
                    console.error(`Document with set_name ${projectSetName} does not exist in the AnswerSet collection.`);
                }
            } catch (error) {
                console.error(`Error adding new species to ${selectedProject}:`, error);
                alert('Failed to add the species.');
            }
        } else {
            alert("Please select a project, critter, and enter all species details.");
        }
    };

    const addSiteToProjectDocument = async (project, siteName) => {
        const projectDocument = `${project}Sites`;
        await updateDoc(doc(db, 'AnswerSet', projectDocument), {
            answers: arrayUnion({ primary: siteName })
        });
    };

    const renderModalContent = () => {
        switch (modalStep) {
            case 1:
                return (
                    <div className="p-6 bg-white dark:bg-neutral-900 rounded-lg flex flex-col items-center">

                        <h2 className="text-xl font-bold mb-4">Collection</h2>
                        <Button
                            onClick={() => setModalStep(2)}
                            text="AnswerSet"
                            className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center mb-4 w-full"
                        />
                        <Button
                            onClick={handleAddArrayClick}
                            text="Add Array"
                            className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center mb-4 w-full"
                        />
                        <Button
                            onClick={handleDeleteArrayClick}
                            text="Delete Array"
                            className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center mb-4 w-full"
                        />
                        <Button
                            onClick={handleAddSite}
                            text="Add Site"
                            className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center mb-4 w-full"
                        />
                        <Button
                            onClick={handleAddSpecies}
                            text="Add Species"
                            className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center w-full"
                        />

                    </div>
                );
            case 2:
                return (
                    <div className="p-6 bg-white dark:bg-neutral-900 rounded-lg flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-4">Document Options</h2>
                        <p className="text-grey-600 dark:text-neutral-400 mb-4 text-center">
                            Please select one of the options below to modify or create a new document. Use the "Modify Existing Document" option to edit, or the "Create New Document" option to start a new document.
                        </p>
                        <div className="flex flex-col gap-4 w-full max-w-xs">
                            <Button
                                onClick={() => setModalStep(3)}
                                text="Modify Existing Document"
                                className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center px-6 py-3 rounded w-full"
                            />
                            <Button
                                onClick={() => setShowNewDocumentModal(true)}
                                text="Create New Document"
                                className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center px-6 py-3 rounded w-full"
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="p-6 bg-white dark:bg-neutral-900 rounded-lg overflow-y-auto" style={{ maxHeight: '300px' }}>
                        <h2 className="text-xl font-bold mb-4">Modify Document</h2>
                        <ul className="space-y-2">
                            {documents
                                .slice() // Make a copy to avoid mutating the original array
                                .sort((a, b) => (a.set_name || "").localeCompare(b.set_name || "")) // Sort alphabetically by set_name
                                .map((doc, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => handleDocumentClick(doc)}
                                        text={doc.set_name || `Document ${index + 1}`}
                                        className="bg-white text-black dark:bg-neutral-700 dark:text-white border border-black px-4 py-2 rounded hover:bg-neutral-400 dark:hover:bg-gray-800 w-full"
                                    />
                                ))}
                        </ul>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex justify-center items-center bg-white dark:bg-neutral-900 overflow-hidden">
            <div className="w-[600px] max-h-[400px] bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-4 overflow-hidden">

                {renderModalContent()}
            </div>

            {showDeleteConfirm && renderDeleteArrayModal()}
            {/* Add Site Options Modal */}
            {showAddSiteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Site Options</h2>
                        {/* Project Selection Dropdown */}
                        <label className="block mb-2 font-medium">Select Project:</label>
                        <select
                            value={selectedProject}
                            onChange={(e) => handleProjectSelection(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                        >
                            <option value="">Select a Project</option>
                            <option value="Gateway">Gateway</option>
                            <option value="San Pedro">San Pedro</option>
                            <option value="Virgin River">Virgin River</option>
                        </select>

                        {/* Conditional buttons displayed after project selection */}
                        {selectedProject && (
                            <>
                                <Button
                                    onClick={() => {
                                        setShowViewSites(true);
                                        setShowAddSiteForm(false);
                                        fetchSitesForProject(selectedProject);
                                    }}
                                    text="View Existing Sites"
                                    className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center w-full mb-2"
                                />
                                <Button
                                    onClick={() => {
                                        setShowAddSiteForm(true);
                                        setShowViewSites(false);
                                    }}
                                    text="Add New Site"
                                    className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center w-full mb-4"
                                />
                            </>
                        )}

                        <Button
                            onClick={() => setShowAddSiteModal(false)}
                            text="Close"
                            className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center "
                        />
                    </div>
                </div>
            )}
            {/* View Sites Modal */}
            {showViewSites && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Existing Sites for {selectedProject}</h2>
                        {renderExistingSites()}
                        <Button
                            onClick={() => setShowViewSites(false)}
                            text="Close"
                            className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center mt-4"
                        />
                    </div>
                </div>
            )}

            {/* New Document Modal */}
            {showNewDocumentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Create New Document</h2>
                        <label className="block mb-2 font-medium">Answer Set Name:</label>
                        <input
                            type="text"
                            value={newAnswerSetName}
                            onChange={(e) => setNewAnswerSetName(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                            placeholder="Enter answer set name"
                        />
                        <label className="block mb-2 font-medium">Secondary Keys:</label>
                        {secondaryKeys.map((key, index) => (
                            <p key={index} className="ml-2 mb-2 text-gray-700">- {key}</p>
                        ))}
                        <input
                            type="text"
                            value={newSecondaryKey}
                            onChange={(e) => setNewSecondaryKey(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                            placeholder="Enter secondary key"
                        />
                        <Button
                            onClick={handleAddSecondaryKey}
                            text="Add Secondary Key"
                            className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center mb-2 w-full"
                        />
                        <Button
                            onClick={handleSubmitNewDocument}
                            text="Submit"
                            className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center mb-2 w-full"
                        />
                        <Button
                            onClick={() => setShowNewDocumentModal(false)}
                            text="Cancel"
                            className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center w-full"
                        />
                    </div>
                </div>
            )}
            {editModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Data</h2>
                        <select
                            className="mb-4 p-2 border rounded w-full"
                            value={selectedData}
                            onChange={(e) => {
                                setSelectedData(e.target.value);
                                handleDataSelection(e.target.value);
                            }}
                        >
                            {dataOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                        <h3 className="text-lg font-bold mb-2">Edit Data</h3>
                        {renderEditDataFields()}
                        <div className="flex justify-end mt-4 space-x-2">
                            <Button onClick={() => setEditModalVisible(false)} text="Cancel" className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center" />
                            <Button onClick={submitChanges} text="Save" className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center" />
                        </div>
                    </div>
                </div>
            )}


            {showAddSiteForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Enter New Site</h2>
                        <input
                            type="text"
                            value={newSiteName}
                            onChange={(e) => setNewSiteName(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                            placeholder="Enter site name"
                        />
                        <div className="flex justify-end space-x-2">
                            <Button
                                onClick={() => setShowAddSiteForm(false)}
                                text="Cancel"
                                className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center"
                            />
                            <Button
                                onClick={async () => {
                                    if (newSiteName.trim()) {
                                        await addNewSite(); // Call the addNewSite function here
                                        setNewSiteName(''); // Clear input field
                                        setShowAddSiteForm(false);
                                        setShowAddSiteModal(false);
                                    } else {
                                        alert("Please enter a site name.");
                                    }
                                }}
                                text="Add Site"
                                className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Add Species Modal */}
            {showAddSpeciesModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Species Options</h2>
                        <label className="block mb-2 font-medium">Select Project:</label>
                        <select
                            value={selectedProject}
                            onChange={(e) => handleProjectSelection(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                        >
                            <option value="">Select a Project</option>
                            <option value="Gateway">Gateway</option>
                            <option value="San Pedro">San Pedro</option>
                            <option value="Virgin River">Virgin River</option>
                        </select>

                        <label className="block mb-2 font-medium">Select Taxa:</label>
                        <select
                            value={selectedCritter}
                            onChange={(e) => handleCritterSelection(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                        >
                            <option value="">Select a Taxa</option>
                            <option value="Lizard">Lizard</option>
                            <option value="Mammal">Mammal</option>
                            <option value="Snake">Snake</option>
                            <option value="Amphibian">Amphibian</option>
                            <option value="Turtle">Turtle</option>
                        </select>

                        {selectedProject && selectedCritter && (
                            <>
                                <Button
                                    onClick={() => setShowAddSpeciesForm(true)}
                                    text="Add New Species"
                                    className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center mb-2"
                                />
                            </>
                        )}

                        <Button
                            onClick={() => setShowAddSpeciesModal(false)}
                            text="Close"
                            className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center"
                        />
                    </div>
                </div>
            )}

            {showAddSpeciesForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Enter New Species</h2>
                        <input
                            type="text"
                            value={newPrimary}
                            onChange={(e) => setNewPrimary(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                            placeholder="4-letter code"
                        />
                        <input
                            type="text"
                            value={newGenus}
                            onChange={(e) => setNewGenus(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                            placeholder="Genus"
                        />
                        <input
                            type="text"
                            value={newSpecies}
                            onChange={(e) => setNewSpecies(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                            placeholder="Species"
                        />
                        <div className="flex justify-end space-x-2">
                            <Button
                                onClick={() => setShowAddSpeciesForm(false)}
                                text="Cancel"
                                className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center"
                            />
                            <Button
                                onClick={addNewSpecies}
                                text="Add Species"
                                className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center"
                            />
                        </div>
                    </div>
                </div>
            )}

            {showAddArrayModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Add New Array</h2>
                        <label className="block mb-2 font-medium">Array Name:</label>
                        <input
                            type="text"
                            value={newArrayName}
                            onChange={(e) => setNewArrayName(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                            placeholder="Enter array name"
                        />

                        <label className="block mb-2 font-medium">Primary Values:</label>
                        {primaryValues.map((value, index) => (
                            <p key={index} className="ml-2 mb-2 text-gray-700">- {value}</p>
                        ))}
                        <input
                            type="text"
                            value={newPrimaryValue}
                            onChange={(e) => setNewPrimaryValue(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                            placeholder="Enter primary value"
                        />
                        <Button
                            onClick={handleAddPrimaryValue}
                            text="Add Primary Value"
                            className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center mb-2 w-full"
                        />

                        <label className="block mb-2 font-medium">Secondary Keys:</label>
                        {secondaryKeys.map((key, index) => (
                            <p key={index} className="ml-2 mb-2 text-gray-700">- {key}</p>
                        ))}
                        <input
                            type="text"
                            value={newSecondaryKey}
                            onChange={(e) => setNewSecondaryKey(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                            placeholder="Enter secondary key"
                        />
                        <Button
                            onClick={handleAddSecondaryKey}
                            text="Add Secondary Key"
                            className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center mb-2 w-full"
                        />


                        <div className="flex justify-end space-x-2">
                            <Button
                                onClick={() => setShowAddArrayModal(false)}
                                text="Cancel"
                                className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center"
                            />
                            <Button
                                onClick={handleSubmitNewArray}
                                text="Add Array"
                                className="flex rounded-md p-1.5 text-white whitespace-nowrap bg-asu-maroon border-2 border-transparent items-center"
                            />
                        </div>
                    </div>
                </div>
            )}
            {successMessage && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md">
                    {successMessage}
                </div>
            )}
            {messageBox.show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                        <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">{messageBox.text}</p>
                        <button
                            onClick={() => setMessageBox({ show: false, text: '' })}
                            className="bg-asu-maroon text-white px-4 py-2 border border-white rounded hover:bg-maroon-700"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}


        </div>
    );
}