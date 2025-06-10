import './privacy.css'


const Privacy = () => {
  return (
    <div className='privacy-container'>
        <h1 className="privacy-header">Privacy Policy</h1>
        <p className='privacy-content'>
        Privacy Policy
        Effective Date: [09/06/2025]

        Welcome to Array ("we", "our", or "us"). Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our AI-based tool that transforms images into a digital rain Matrix-like effect (the "Service").
        </p>
        
        <ul className='privacy-lists'>
            <li>Information We Collect
                <ul>
                    <li>
                        Uploaded Images
                        To generate the digital rain effect, our AI requires image input. Images uploaded by users are processed either locally or on secure servers.
                    </li>
                    <li>
                        Automatically Collected Data
                        When you access our Service, we may automatically collect certain information such as:
                        IP address
                        Browser type
                        Device information
                        Usage data (e.g., time spent on the site, interactions)
                        This helps us improve the functionality and user experience.
                    </li>
                </ul>
            </li>

            <li>
                How We Use Your Information
                We use your information solely to:
                Process your image and generate the visual effect
                Improve and maintain our Service
                Ensure security and prevent misuse
                Analyze anonymized usage trends
                We do not use your images for training AI models or any other purpose without explicit user consent.
            </li>

            <li>
                Data Retention
                Uploaded images are:
                Temporarily stored for processing
                Automatically deleted unless otherwise stated or saved to the Arraverse
                We do not retain any personally identifiable images or metadata after the processing session ends.
            </li>

            <li>
                Data Sharing
                We do not sell, rent, or share your personal data or images with third parties, except:
                If required by law or regulation
                To trusted service providers who help us operate the Service (with strict data protection agreements)
            </li>

            <li>
                Your Rights
                Depending on your jurisdiction, you may have the right to:
                Access the data we hold about you
                Request deletion of your data
                Withdraw consent where applicable
                Contact us at <a href="mailto: arrayuniverse09@gmail.com">arrayuniverse09@gmail.com</a> for any privacy-related inquiries or requests.
            </li>


            <li>
                6. Security
                We take appropriate security measures to protect your data, including:
                Secure image transmission (HTTPS)
                Timely deletion of temporary files
                No permanent storage without consent
            </li>

            <li>
                7. Children's Privacy
                Our Service is not intended for individuals under the age of 13. We do not knowingly collect personal data from children. If we discover such data, it will be promptly deleted.
            </li>

            <li>
                8. Changes to This Policy
                We may update this Privacy Policy occasionally. We will notify users of significant changes via our website or app. Continued use of the Service after changes indicates acceptance.
            </li>

            <li>
                9. Contact Us
                For questions or concerns about this Privacy Policy, contact us at:
                📧 <a href="mailto: arrayuniverse09@gmail.com">arrayuniverse09@gmail.com</a>
                {/* 🌐 [your website] */}
            </li>
        </ul>
    </div>
  )
}

export default Privacy
