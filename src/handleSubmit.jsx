const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const response = await fetch('http://localhost:3001/api/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setIsModalOpen(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    college: '',
                    year: '',
                    resume: '',
                    message: ''
                });
            }, 3000);
        } else {
            alert(result.error || 'Failed to submit');
        }
    } catch (err) {
        alert('Cannot connect to server. Is it running on port 3001?');
    } finally {
        setIsSubmitting(false);
    }
};