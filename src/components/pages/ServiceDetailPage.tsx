'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion'
import { PageId } from '@/lib/types'
import {
  ArrowLeft, MapPin, Clock, Phone, FileText, CheckCircle, ChevronRight,
  Download, CreditCard, Building2, Banknote, Smartphone, CircleDot,
  Baby, FileCheck, Building as BuildingIcon, Map, Receipt, Heart,
  Stethoscope, GraduationCap, Bus, Droplets, MessageSquareWarning, CalendarDays,
  HelpCircle, Mail, Send, ExternalLink
} from 'lucide-react'
import { useState } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

interface ServiceDetailPageProps {
  serviceId: string | null
  navigateTo: (page: PageId, extra?: { serviceId?: string; vacancyId?: string; newsId?: string; bidId?: string }) => void
}

const serviceIcons: Record<string, React.ElementType> = {
  'Birth Registration': Baby, 'Business License': FileCheck, 'Building Permit': BuildingIcon,
  'Land Services': Map, 'Tax Payment': Receipt, 'Marriage Registration': Heart,
  'Health Services': Stethoscope, 'Education': GraduationCap, 'Transportation': Bus,
  'Water & Electricity': Droplets, 'Complaints & Feedback': MessageSquareWarning, 'Appointments': CalendarDays,
}

const serviceDataMap: Record<string, {
  description: string
  requirements: string[]
  process: { title: string; desc: string }[]
  documents: { name: string; desc: string }[]
  fees: { type: string; fee: string; time: string }[]
  faqs: { q: string; a: string }[]
  office: string
  phone: string
  processingTime: string
  serviceFee: string
}> = {
  'Birth Registration': {
    description: 'The Birth Registration service allows parents and guardians to register newborns and obtain official birth certificates issued by the Dessie City Administration. Birth registration is a fundamental right and is required for school enrollment, passport applications, and access to government services. The service is available at all 12 kebele offices across the city and through our online portal for added convenience.',
    requirements: ['Child must be registered within 30 days of birth', 'Parent or legal guardian must present valid identification', 'Hospital or health center birth notification letter required', 'Two passport-size photographs of the child', 'Parents\' marriage certificate (if applicable)'],
    process: [
      { title: 'Visit Kebele Office or Go Online', desc: 'Go to your nearest kebele sub-city office or visit the online portal to begin registration.' },
      { title: 'Submit Required Documents', desc: 'Present the birth notification, parent IDs, photographs, and any supporting documents.' },
      { title: 'Information Verification', desc: 'The registration officer verifies all information and enters it into the national registry system.' },
      { title: 'Certificate Issuance', desc: 'An official birth certificate is printed and issued within 3 working days.' },
    ],
    documents: [
      { name: 'Birth Notification Form', desc: 'Hospital-issued birth notification letter' },
      { name: 'Parent ID Copy', desc: 'Photocopy of parent/guardian national ID' },
      { name: 'Application Form', desc: 'Completed birth registration application' },
      { name: 'Photo Template', desc: 'Passport-size photo specification guide' },
      { name: 'Affidavit Template', desc: 'For late registration (after 30 days)' },
      { name: 'Marriage Certificate Copy', desc: 'Optional, if parents are married' },
    ],
    fees: [
      { type: 'Standard Registration (within 30 days)', fee: 'Free', time: '3 days' },
      { type: 'Late Registration', fee: 'ETB 100', time: '7 days' },
      { type: 'Replacement Certificate', fee: 'ETB 50', time: '5 days' },
    ],
    faqs: [
      { q: 'Is there a deadline for birth registration?', a: 'Births should be registered within 30 days. Late registration incurs a small fee and requires additional documentation.' },
      { q: 'What if I lost the birth notification?', a: 'You can obtain a replacement from the hospital where the birth occurred, or submit an affidavit at the kebele office.' },
      { q: 'Can I register a birth online?', a: 'Yes, the online portal allows you to start the process. You will still need to visit the kebele office for document verification and certificate pickup.' },
      { q: 'What documents does the child receive?', a: 'An official birth certificate issued by the city administration, which is recognized nationally.' },
    ],
    office: 'Kebele Civil Registry Office, Sub-City Hall', phone: '+251 33 111 2233', processingTime: '3 working days', serviceFee: 'Free (standard)',
  },
  'Business License': {
    description: 'Apply for new business licenses or renew existing ones through the Dessie City Trade and Industry Bureau. All types of businesses are supported including retail trade, manufacturing, professional services, and hospitality. The digital application system allows you to track your application status in real time.',
    requirements: ['Valid national identification card (ID)', 'Business plan or description of activities', 'Proof of business location (rental agreement or ownership)', 'Tax identification number (TIN)', 'Two passport-size photographs'],
    process: [
      { title: 'Submit Application', desc: 'Complete the business license application form online or at the Trade Bureau office.' },
      { title: 'Document Review', desc: 'The review committee examines your application and supporting documents.' },
      { title: 'Site Inspection', desc: 'A field officer inspects your business premises for compliance.' },
      { title: 'License Issuance', desc: 'Upon approval, your business license is issued and registered.' },
      { title: 'Annual Renewal', desc: 'Licenses must be renewed annually with updated documentation.' },
    ],
    documents: [
      { name: 'Business License Application', desc: 'Main application form for new licenses' },
      { name: 'Business Plan Template', desc: 'Standard business plan format' },
      { name: 'TIN Registration', desc: 'Tax identification registration form' },
      { name: 'Location Proof Template', desc: 'Rental agreement or ownership deed' },
      { name: 'Renewal Application', desc: 'For existing license renewal' },
      { name: 'Fee Schedule', desc: 'Current license fee structure' },
      { name: 'Compliance Checklist', desc: 'Pre-inspection requirements' },
    ],
    fees: [
      { type: 'Small Enterprise', fee: 'ETB 500 — 2,000', time: '10 days' },
      { type: 'Medium Enterprise', fee: 'ETB 2,000 — 10,000', time: '15 days' },
      { type: 'Large Enterprise', fee: 'ETB 10,000 — 50,000', time: '20 days' },
    ],
    faqs: [
      { q: 'How long does it take to get a business license?', a: 'Processing time depends on business size: 10 days for small, 15 days for medium, and 20 days for large enterprises.' },
      { q: 'Can I track my application online?', a: 'Yes, after submitting your application you receive a tracking number to monitor progress through our portal.' },
      { q: 'What types of businesses need a license?', a: 'All commercial, manufacturing, and service businesses operating within Dessie city limits require a municipal business license.' },
    ],
    office: 'Trade & Industry Bureau, City Hall 2nd Floor', phone: '+251 33 111 2244', processingTime: '10-20 working days', serviceFee: 'ETB 500 — 50,000',
  },
  'Building Permit': {
    description: 'Obtain official construction permits for residential, commercial, and industrial buildings in Dessie City. All construction within city limits requires a valid building permit to ensure compliance with urban planning regulations, safety standards, and environmental guidelines.',
    requirements: ['Valid land title deed or lease agreement', 'Architectural and structural drawings by licensed engineer', 'Site plan showing location and boundaries', 'National ID of applicant/owner', 'Environmental impact assessment (for large projects)', 'Neighbors\' consent form for adjacent properties'],
    process: [
      { title: 'Submit Application & Drawings', desc: 'Submit complete architectural drawings and application form to the Urban Planning Bureau.' },
      { title: 'Technical Review', desc: 'Engineers review drawings for compliance with building codes and safety standards.' },
      { title: 'Site Visit', desc: 'Inspectors visit the proposed construction site to verify land ownership and boundaries.' },
      { title: 'Permit Approval', desc: 'Upon passing review, the building permit is issued with a unique reference number.' },
      { title: 'Construction Monitoring', desc: 'Periodic inspections are conducted during construction to ensure compliance.' },
    ],
    documents: [
      { name: 'Building Permit Application', desc: 'Main permit application form' },
      { name: 'Architectural Drawing Template', desc: 'Required drawing format specifications' },
      { name: 'Site Plan Form', desc: 'Location and boundary documentation' },
      { name: 'Structural Calculation Sheet', desc: 'Engineer-certified structural form' },
      { name: 'Environmental Assessment Guide', desc: 'For projects over 500 m²' },
      { name: 'Neighbor Consent Form', desc: 'Required signatures from adjacent properties' },
    ],
    fees: [
      { type: 'Residential (under 200 m²)', fee: 'ETB 2,000', time: '15 days' },
      { type: 'Residential (200–500 m²)', fee: 'ETB 5,000', time: '20 days' },
      { type: 'Commercial Building', fee: 'ETB 10,000 — 50,000', time: '30 days' },
      { type: 'Industrial Facility', fee: 'ETB 50,000+', time: '45 days' },
    ],
    faqs: [
      { q: 'Can I start construction without a permit?', a: 'No. Construction without a valid permit is illegal and subject to demolition order and fines up to ETB 100,000.' },
      { q: 'Do I need a licensed engineer to submit drawings?', a: 'Yes, all structural and architectural drawings must be prepared and certified by a licensed engineer registered with ESEC.' },
      { q: 'How long is a building permit valid?', a: 'Building permits are valid for 2 years from the date of issuance. Extensions may be granted upon application.' },
    ],
    office: 'Urban Planning Bureau, City Hall Ground Floor', phone: '+251 33 111 2255', processingTime: '15–45 working days', serviceFee: 'ETB 2,000 — 50,000+',
  },
  'Land Services': {
    description: 'Access comprehensive land administration services in Dessie City including land registration, title deed issuance, cadastral surveys, land lease renewals, and land transfer. The Land Administration Office manages all land parcels within the city\'s 254 km² jurisdiction.',
    requirements: ['Valid national ID card', 'Proof of land acquisition (purchase agreement, inheritance, or allocation letter)', 'Previous land documentation if available', 'Tax clearance certificate', 'Two passport-size photographs', 'Payment receipt for survey fees'],
    process: [
      { title: 'File Application', desc: 'Submit application with all documents at the Land Administration Office or online.' },
      { title: 'Cadastral Survey', desc: 'Surveyors measure and map the land parcel, establishing official boundaries.' },
      { title: 'Verification & Registration', desc: 'Land ownership is verified through the national land registry system.' },
      { title: 'Title Deed Issuance', desc: 'An official land title deed (Yerist Limat) is issued upon successful registration.' },
    ],
    documents: [
      { name: 'Land Registration Application', desc: 'Primary land service application' },
      { name: 'Land Lease Agreement', desc: 'Standard city lease agreement form' },
      { name: 'Transfer Form', desc: 'For land ownership transfers' },
      { name: 'Inheritance Declaration', desc: 'For inherited land documentation' },
      { name: 'Survey Request Form', desc: 'Cadastral survey application' },
      { name: 'Title Deed Template', desc: 'Sample of official title deed format' },
    ],
    fees: [
      { type: 'New Registration', fee: 'ETB 500 — 5,000', time: '30 days' },
      { type: 'Cadastral Survey', fee: 'ETB 1,000 — 10,000', time: '21 days' },
      { type: 'Title Deed Replacement', fee: 'ETB 200', time: '10 days' },
      { type: 'Land Transfer', fee: '2% of land value', time: '15 days' },
    ],
    faqs: [
      { q: 'What is a title deed and why do I need one?', a: 'A title deed (Yerist Limat) is the official legal document proving land ownership. It is required for loans, sales, construction permits, and inheritance.' },
      { q: 'How long does cadastral survey take?', a: 'Cadastral surveys typically take 15–21 working days after fee payment and scheduling.' },
      { q: 'Can I transfer land to a family member?', a: 'Yes, land can be transferred to immediate family members with reduced transfer fees. A transfer deed and both parties\' IDs are required.' },
    ],
    office: 'Land Administration Office, City Hall 1st Floor', phone: '+251 33 111 2266', processingTime: '10–30 working days', serviceFee: 'ETB 200 — 10,000',
  },
  'Tax Payment': {
    description: 'Pay all municipal taxes, property taxes, business taxes, and service fees through the Dessie City Revenue Office. Multiple payment channels are available including online banking, mobile money, and in-person payment at any of 12 kebele offices.',
    requirements: ['Valid Taxpayer Identification Number (TIN)', 'National ID card', 'Previous tax receipts (for payment history)', 'Property ownership documents (for property tax)', 'Business license (for business tax)'],
    process: [
      { title: 'Receive Tax Assessment', desc: 'Annual tax bills are issued by the Revenue Office based on property valuation and business activity.' },
      { title: 'Review Assessment', desc: 'Review the tax bill for accuracy. Disputes must be filed within 30 days of assessment.' },
      { title: 'Make Payment', desc: 'Pay online through Telebirr/CBE Birr, at any commercial bank, or at the Revenue Office.' },
      { title: 'Receive Receipt', desc: 'Official payment receipt is issued immediately. Keep this for records and permit renewals.' },
    ],
    documents: [
      { name: 'Tax Payment Form', desc: 'Official payment slip template' },
      { name: 'Property Assessment Appeal', desc: 'Dispute form for incorrect assessments' },
      { name: 'Tax Clearance Certificate', desc: 'Proof of up-to-date tax compliance' },
      { name: 'TIN Registration Guide', desc: 'How to register for a taxpayer ID' },
      { name: 'Payment Receipt Template', desc: 'Sample official receipt format' },
    ],
    fees: [
      { type: 'Residential Property Tax', fee: '0.5% — 1% of assessed value', time: 'Annual' },
      { type: 'Commercial Property Tax', fee: '1% — 2% of assessed value', time: 'Annual' },
      { type: 'Small Business Tax', fee: 'ETB 1,000 — 15,000', time: 'Annual' },
      { type: 'Late Payment Penalty', fee: '10% of unpaid amount', time: 'Per month overdue' },
    ],
    faqs: [
      { q: 'When are property taxes due?', a: 'Property taxes must be paid by March 31st of each year. Late payments incur a 10% monthly penalty.' },
      { q: 'Can I pay taxes in installments?', a: 'Yes, you may request an installment plan for amounts over ETB 10,000. Apply at the Revenue Office before the due date.' },
      { q: 'What happens if I don\'t pay taxes?', a: 'Unpaid taxes result in penalties, interest charges, and may lead to property liens or business license suspension.' },
    ],
    office: 'City Revenue Office, Finance Building 1st Floor', phone: '+251 33 111 2277', processingTime: 'Immediate (payment)', serviceFee: 'Varies by tax type',
  },
  'Marriage Registration': {
    description: 'Register civil and religious marriages and obtain official marriage certificates recognized by Ethiopian law. The Civil Registry Office provides marriage registration services at all kebele offices and the main city hall, with both Ethiopian Orthodox and civil ceremony options.',
    requirements: ['National ID cards of both parties', 'Birth certificates of both parties', 'Written consent from parents (if either party is under 18)', 'Divorce or death certificate (if previously married)', 'Two witnesses with valid IDs', 'Two passport-size photographs of each party'],
    process: [
      { title: 'Book Appointment', desc: 'Schedule your registration appointment online or at the kebele office.' },
      { title: 'Document Submission', desc: 'Submit all required documents and application form at least 5 days before the ceremony.' },
      { title: 'Ceremony & Signing', desc: 'Attend the civil ceremony at the registry office with your witnesses and sign the marriage register.' },
      { title: 'Certificate Issuance', desc: 'Official marriage certificate is issued immediately after the ceremony.' },
    ],
    documents: [
      { name: 'Marriage Application Form', desc: 'Joint application for both parties' },
      { name: 'Birth Certificate Copy', desc: 'Certified copies for both applicants' },
      { name: 'Witness Consent Form', desc: 'Signed by both witnesses' },
      { name: 'Prior Marriage Documents', desc: 'Divorce decree or death certificate if applicable' },
      { name: 'Photo Specification Guide', desc: 'Required photograph format' },
    ],
    fees: [
      { type: 'Civil Marriage Certificate', fee: 'ETB 50', time: 'Same day' },
      { type: 'Replacement Certificate', fee: 'ETB 100', time: '5 days' },
      { type: 'Certified Translation', fee: 'ETB 300', time: '5 days' },
    ],
    faqs: [
      { q: 'Is a civil marriage required even after a religious ceremony?', a: 'For legal recognition under Ethiopian law, civil registration is required. Religious ceremonies alone are not legally binding.' },
      { q: 'How far in advance must we apply?', a: 'Applications must be submitted at least 5 working days before the desired ceremony date.' },
      { q: 'Can we get a marriage certificate in English?', a: 'Yes, officially translated certificates in English are available for an additional fee of ETB 300.' },
    ],
    office: 'Civil Registry Office, City Hall Ground Floor', phone: '+251 33 111 2233', processingTime: 'Same day — 5 days', serviceFee: 'ETB 50 — 300',
  },
  'Health Services': {
    description: 'Access public health services, find health facilities, and access health information through the Dessie City Health Bureau. The city operates 8 hospitals, 15 health centers, 32 clinics, and numerous pharmacies serving over 450,000 residents.',
    requirements: ['Valid national ID (for records)', 'Health insurance card if available', 'Previous medical records if applicable', 'Referral letter for specialist consultations'],
    process: [
      { title: 'Find Your Facility', desc: 'Use our facility directory to find the nearest hospital, health center, or clinic.' },
      { title: 'Register at Facility', desc: 'Present your ID and register at the facility reception for a patient card.' },
      { title: 'Receive Services', desc: 'Access consultation, diagnostics, treatment, and follow-up care.' },
      { title: 'Follow-Up', desc: 'Schedule follow-up appointments as needed and collect prescriptions.' },
    ],
    documents: [
      { name: 'Health Facility Directory', desc: 'Complete list of facilities with contacts' },
      { name: 'Health Insurance Guide', desc: 'Information on CBHI enrollment' },
      { name: 'Referral Letter Template', desc: 'For specialist consultations' },
      { name: 'Vaccination Schedule', desc: 'National immunization program schedule' },
      { name: 'Emergency Contacts', desc: 'All emergency health service numbers' },
    ],
    fees: [
      { type: 'Outpatient Consultation', fee: 'ETB 10 — 50', time: 'Same day' },
      { type: 'Emergency Services', fee: 'Free (public hospitals)', time: 'Immediate' },
      { type: 'Laboratory Tests', fee: 'ETB 50 — 500', time: '1–3 days' },
      { type: 'CBHI Premium', fee: 'ETB 400/year per family', time: 'Annual enrollment' },
    ],
    faqs: [
      { q: 'What is CBHI and should I enroll?', a: 'Community-Based Health Insurance (CBHI) covers most health services for a small annual premium. Enrollment is available at any health facility.' },
      { q: 'Where is the nearest 24-hour emergency service?', a: 'Dessie Referral Hospital (Tel: +251 33 111 0000) and Boru Meda Hospital provide 24-hour emergency services.' },
      { q: 'Are maternal health services free?', a: 'Yes, antenatal care, delivery, and postnatal care are provided free of charge at all public facilities.' },
    ],
    office: 'Health Bureau, City Hall 2nd Floor', phone: '+251 33 111 0000 (Emergency)', processingTime: 'Varies by service', serviceFee: 'ETB 10 — 500 (free emergency)',
  },
  'Education': {
    description: 'Access educational services including school enrollment, scholarship information, TVET program applications, and adult education programs. Dessie City operates 45+ primary schools, 18 secondary schools, 6 TVET colleges, and is home to Wollo University.',
    requirements: ['National ID or birth certificate (for student)', 'Parent/guardian ID', 'Previous school records or completion certificate', 'Residence proof within the sub-city', 'Recent passport-size photographs'],
    process: [
      { title: 'Check Enrollment Period', desc: 'Primary school enrollment opens annually in August. TVET and adult programs accept rolling applications.' },
      { title: 'Submit Application', desc: 'Apply at the nearest school or Education Bureau office with required documents.' },
      { title: 'Placement Assessment', desc: 'Students may be assessed for appropriate grade or skill level placement.' },
      { title: 'Confirm Enrollment', desc: 'Receive enrollment confirmation and report to school on opening day.' },
    ],
    documents: [
      { name: 'School Enrollment Form', desc: 'Primary and secondary school application' },
      { name: 'TVET Application Form', desc: 'Technical & vocational training application' },
      { name: 'Scholarship Application', desc: 'City merit scholarship application guide' },
      { name: 'Transfer Request Form', desc: 'For transferring between schools' },
      { name: 'Adult Literacy Program', desc: 'Community adult education program info' },
    ],
    fees: [
      { type: 'Government Primary School', fee: 'Free', time: 'Annual enrollment' },
      { type: 'Government Secondary School', fee: 'Free', time: 'Annual enrollment' },
      { type: 'TVET Program (government)', fee: 'ETB 500 — 2,000/year', time: '1–2 years' },
      { type: 'Scholarship (merit-based)', fee: 'Free + stipend', time: 'Per academic year' },
    ],
    faqs: [
      { q: 'Is education compulsory in Dessie?', a: 'Yes, primary education (grades 1–8) is compulsory for all children aged 7–14. Failure to enroll is subject to community follow-up.' },
      { q: 'How do I apply for a city scholarship?', a: 'Merit scholarships are awarded based on national exam results. Apply through the Education Bureau by September 30th each year.' },
      { q: 'Are there adult literacy programs?', a: 'Yes, free adult literacy and numeracy programs run year-round at community centers. Contact the Education Bureau for schedules.' },
    ],
    office: 'Education Bureau, City Hall 2nd Floor', phone: '+251 33 111 2288', processingTime: '5–15 working days', serviceFee: 'Free — ETB 2,000/year',
  },
  'Transportation': {
    description: 'Access public transportation information, taxi services, and traffic management for Dessie City. The Transport Authority manages public bus routes, taxi licensing, road safety enforcement, and traffic signal systems across all major corridors.',
    requirements: ['Valid ID (for licensing services)', 'Vehicle documentation (for vehicle-related services)', 'Driving license (for traffic violation queries)'],
    process: [
      { title: 'Plan Your Route', desc: 'Use our online route map or contact the Transport Office for bus schedules and taxi zones.' },
      { title: 'Use Public Transport', desc: 'City buses run on fixed routes. Taxis operate throughout the city with metered fares.' },
      { title: 'Report Issues', desc: 'Report traffic violations, broken signals, or unsafe road conditions through the Transport hotline.' },
      { title: 'Licensing Services', desc: 'Vehicle and driver licensing is processed at the Transport Office on working days.' },
    ],
    documents: [
      { name: 'Bus Route Map', desc: 'All city bus routes and stops' },
      { name: 'Taxi Fare Schedule', desc: 'Official metered fare rates' },
      { name: 'Traffic Violation Form', desc: 'Report unsafe driving or road hazards' },
      { name: 'Vehicle License Application', desc: 'For commercial vehicle registration' },
      { name: 'Parking Permit Form', desc: 'Reserved parking zone application' },
    ],
    fees: [
      { type: 'City Bus Fare', fee: 'ETB 3 — 15', time: 'Per trip' },
      { type: 'Taxi (base rate)', fee: 'ETB 30 + metered', time: 'Per trip' },
      { type: 'Commercial Vehicle License', fee: 'ETB 500 — 3,000', time: '10 days' },
      { type: 'Parking Permit (monthly)', fee: 'ETB 200 — 500', time: 'Monthly' },
    ],
    faqs: [
      { q: 'What are the main bus routes?', a: 'Routes 1–8 cover all major kebeles. Route 1 runs from Piazza to Arada, Route 5 covers the hospital and university corridor.' },
      { q: 'Are there ride-hailing apps in Dessie?', a: 'Ride apps are available including local platforms. Traditional taxis with city-approved meters are also widely available.' },
      { q: 'How do I report a traffic violation?', a: 'Call the Transport Hotline at +251 33 111 2299 or use the online reporting form to report violations and road hazards.' },
    ],
    office: 'Transport Office, Ground Floor, Traffic Building', phone: '+251 33 111 2299', processingTime: 'Varies', serviceFee: 'ETB 3 — 3,000',
  },
  'Water & Electricity': {
    description: 'Access utility services for water supply, sanitation, and electricity through the Dessie Water & Sewerage Enterprise and Electricity Distribution Department. Services include new connections, billing inquiries, outage reports, and meter installations for all 12 kebeles.',
    requirements: ['National ID card', 'Land title deed or lease agreement (for new connections)', 'Completed application form', 'Recent utility bill (for existing account queries)', 'Letter from kebele administration'],
    process: [
      { title: 'Apply for New Connection', desc: 'Submit application with land documents and ID at the Utility Office or online portal.' },
      { title: 'Site Inspection', desc: 'Technicians inspect the connection point and prepare installation cost estimate.' },
      { title: 'Pay Connection Fee', desc: 'Pay the quoted connection fee at the utility office or via mobile payment.' },
      { title: 'Installation', desc: 'Connection and meter installation is completed within 5–10 working days after payment.' },
    ],
    documents: [
      { name: 'New Connection Application', desc: 'Water or electricity connection request form' },
      { name: 'Meter Transfer Form', desc: 'For property sales and ownership changes' },
      { name: 'Billing Dispute Form', desc: 'For incorrect meter reading complaints' },
      { name: 'Outage Report Template', desc: 'Documenting prolonged service interruptions' },
      { name: 'Tariff Schedule', desc: 'Current utility rate schedule for all consumer categories' },
    ],
    fees: [
      { type: 'Water Connection (residential)', fee: 'ETB 3,000 — 8,000', time: '10 days' },
      { type: 'Electricity Connection (residential)', fee: 'ETB 5,000 — 15,000', time: '5 days' },
      { type: 'Meter Replacement', fee: 'ETB 500 — 2,000', time: '3 days' },
      { type: 'Monthly Water Bill', fee: 'ETB 50 — 500', time: 'Monthly' },
    ],
    faqs: [
      { q: 'How do I report a water leak or power outage?', a: 'Call the Water Enterprise at +251 33 111 2300 or the Electricity Office at +251 33 111 2301 available 24/7 for emergencies.' },
      { q: 'Can I pay utility bills via mobile phone?', a: 'Yes, all utility bills can be paid via Telebirr, CBE Birr, or direct bank transfer. Reference your account number.' },
      { q: 'What is the minimum water tariff?', a: 'The minimum residential water tariff is ETB 2.50/m³ for the first 5 m³. Industrial rates are higher.' },
    ],
    office: 'Water & Energy Bureau, Service Building 1st Floor', phone: '+251 33 111 2300', processingTime: '3–10 working days', serviceFee: 'ETB 500 — 15,000',
  },
  'Complaints & Feedback': {
    description: 'Submit service complaints, grievances, and suggestions to the Dessie City Administration through multiple channels. All complaints are tracked and you receive a case number for follow-up. The city is committed to resolving 90%+ of complaints within 10 working days.',
    requirements: ['Valid contact information (name, phone, email)', 'Description of the complaint or suggestion', 'Supporting evidence if available (photos, receipts)', 'The relevant department or service involved'],
    process: [
      { title: 'Submit Complaint', desc: 'Use the online form, phone hotline, in-person at any kebele office, or drop a letter at City Hall.' },
      { title: 'Receive Case Number', desc: 'A unique case number is issued within 24 hours for tracking your complaint.' },
      { title: 'Investigation', desc: 'The responsible department investigates the complaint and documents findings.' },
      { title: 'Resolution & Feedback', desc: 'You are notified of the outcome and resolution within 10 working days.' },
    ],
    documents: [
      { name: 'Complaint Submission Form', desc: 'Official complaint registration form' },
      { name: 'Anonymous Report Form', desc: 'For confidential reporting without identification' },
      { name: 'Appeal Form', desc: 'If you are not satisfied with the resolution' },
      { name: 'Evidence Submission Guide', desc: 'How to attach photos and documents' },
      { name: 'Tracking Guide', desc: 'How to check your complaint status online' },
    ],
    fees: [
      { type: 'Complaint Filing', fee: 'Free', time: '10 working days' },
      { type: 'Legal Dispute Filing', fee: 'ETB 50 — 200', time: '30 days' },
    ],
    faqs: [
      { q: 'Can I submit a complaint anonymously?', a: 'Yes, anonymous reports are accepted but may take longer to investigate due to limited follow-up options.' },
      { q: 'What if my complaint is not resolved?', a: 'If unsatisfied with the resolution, submit a formal appeal within 30 days. Unresolved cases can be escalated to the Regional Ombudsman.' },
      { q: 'What types of complaints can I submit?', a: 'Any complaint about city services including road conditions, utility failures, permit delays, noise, waste management, or misconduct by city employees.' },
    ],
    office: 'Public Relations Office, City Hall Ground Floor', phone: '+251 33 111 2200', processingTime: '10 working days', serviceFee: 'Free',
  },
  'Appointments': {
    description: 'Book official appointments with city offices, department heads, and the Mayor\'s Office through the Dessie City Appointment System. Appointments ensure you receive dedicated time with the right official for your specific needs without unnecessary waiting.',
    requirements: ['Valid national ID card', 'Clear description of appointment purpose', 'Previous case or reference number if applicable', 'Contact information for confirmation'],
    process: [
      { title: 'Select Department & Service', desc: 'Choose the department and type of appointment you need from the dropdown menu.' },
      { title: 'Pick Date & Time', desc: 'Select from available slots. Priority slots available for urgent matters.' },
      { title: 'Receive Confirmation', desc: 'Email and SMS confirmation sent within 2 hours of booking.' },
      { title: 'Attend Appointment', desc: 'Arrive 10 minutes early with your ID and confirmation reference.' },
    ],
    documents: [
      { name: 'Appointment Request Form', desc: 'Online/offline appointment booking form' },
      { name: 'Mayor\'s Office Meeting Request', desc: 'Special form for Mayor\'s Office appointments' },
      { name: 'Urgent Matter Declaration', desc: 'For expedited appointment requests' },
      { name: 'Virtual Meeting Guide', desc: 'How to join online appointments via video call' },
    ],
    fees: [
      { type: 'Standard Appointment', fee: 'Free', time: '1–5 days wait' },
      { type: 'Urgent Appointment', fee: 'Free', time: 'Same day (limited slots)' },
      { type: 'Mayor\'s Office Appointment', fee: 'Free', time: '5–10 days wait' },
    ],
    faqs: [
      { q: 'How far in advance can I book?', a: 'Appointments can be booked up to 30 days in advance. Urgent slots are available for same-day needs.' },
      { q: 'What if I need to cancel or reschedule?', a: 'Cancel or reschedule at least 24 hours in advance via phone or the online portal to free the slot for others.' },
      { q: 'Can I bring others to my appointment?', a: 'You may bring one representative or translator. Group meetings require special arrangement through the Communications Office.' },
    ],
    office: 'Appointments & Scheduling Office, City Hall', phone: '+251 33 111 2211', processingTime: '1–10 days (booking)', serviceFee: 'Free',
  },
}

const defaultServiceData = {
  description: 'This municipal service is provided by the Dessie City Administration to serve citizens efficiently and transparently. Our goal is to make government services accessible to all residents through both online and in-person channels. Please visit the relevant office or use our digital portal to access this service.',
  requirements: ['Valid national identification card', 'Completed application form', 'Passport-size photographs (2)', 'Proof of residency in Dessie', 'Any service-specific supporting documents'],
  process: [
    { title: 'Visit Office or Go Online', desc: 'Access the service through our digital portal or visit the designated city office.' },
    { title: 'Submit Application', desc: 'Complete and submit the required application form with all supporting documents.' },
    { title: 'Application Review', desc: 'The responsible department reviews your application for completeness and eligibility.' },
    { title: 'Service Delivery', desc: 'Upon approval, the service is delivered and you receive official confirmation.' },
  ],
  documents: [
    { name: 'Application Form', desc: 'Main service application form' },
    { name: 'ID Copy Template', desc: 'Photocopy specification guide' },
    { name: 'Residence Proof', desc: 'Utility bill or kebele letter' },
    { name: 'Photo Specification', desc: 'Required photo format guide' },
    { name: 'Checklist', desc: 'Complete document checklist' },
    { name: 'Fee Schedule', desc: 'Current service fee structure' },
  ],
  fees: [
    { type: 'Standard Service', fee: 'ETB 50 — 500', time: '5-10 days' },
    { type: 'Expedited Service', fee: 'ETB 1,000', time: '1-2 days' },
  ],
  faqs: [
    { q: 'How do I access this service?', a: 'You can visit the designated city office during working hours or use our online portal for digital access.' },
    { q: 'What are the working hours?', a: 'Monday to Friday, 8:00 AM to 5:00 PM (local time). Closed on public holidays.' },
    { q: 'Can someone else apply on my behalf?', a: 'Yes, with a signed authorization letter and copies of both your ID and the representative\'s ID.' },
    { q: 'What if my application is rejected?', a: 'You will receive a written explanation. You may appeal the decision within 30 days.' },
  ],
  office: 'City Administration Main Office, City Hall', phone: '+251 33 111 2200', processingTime: '5-10 working days', serviceFee: 'ETB 50 — 500',
}

const relatedServices = [
  'Birth Registration', 'Business License', 'Building Permit', 'Tax Payment',
  'Marriage Registration', 'Health Services', 'Education', 'Land Services',
  'Water & Electricity', 'Complaints & Feedback', 'Appointments', 'Transportation',
]

function getServiceData(serviceId: string) {
  return serviceDataMap[serviceId] || defaultServiceData
}

export default function ServiceDetailPage({ serviceId, navigateTo }: ServiceDetailPageProps) {
  const [inquiryName, setInquiryName] = useState('')
  const [inquiryEmail, setInquiryEmail] = useState('')
  const [inquiryMsg, setInquiryMsg] = useState('')

  const title = serviceId || 'Service'
  const IconComp = serviceIcons[title] || FileText
  const data = getServiceData(title)

  const related = relatedServices.filter((s) => s !== title).slice(0, 4)

  return (
    <main>
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-10 text-center relative overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide mb-4">{title}</h1>
          <Separator className="w-20 mx-auto bg-[#c8a415] h-0.5 mb-4" />
          <p className="text-white/70 text-sm tracking-widest uppercase">Home / Services / {title}</p>
        </motion.div>
      </section>

      {/* Back Button */}
      <section className="bg-white py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <button onClick={() => navigateTo('services')} className="flex items-center gap-2 text-[#1a6b3c] font-semibold text-sm hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to All Services
          </button>
        </div>
      </section>

      {/* Service Overview */}
      <section className="bg-white pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div variants={fadeInUp} className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#1a6b3c] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <IconComp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <Badge className="bg-[#1a6b3c]/10 text-[#1a6b3c] border-[#1a6b3c]/20 mb-2">Municipal Service</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0d4a28]">{title}</h2>
                </div>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-muted-foreground leading-relaxed">{data.description}</motion.p>
            </div>
            <motion.div variants={fadeInUp}>
              <Card className="glass border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-bold text-[#0d4a28] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1a6b3c]" /> Quick Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#1a6b3c] mt-0.5 flex-shrink-0" /><div><p className="text-xs text-muted-foreground">Office Location</p><p className="text-sm font-medium">{data.office}</p></div></div>
                  <Separator />
                  <div className="flex items-start gap-3"><Clock className="w-4 h-4 text-[#1a6b3c] mt-0.5 flex-shrink-0" /><div><p className="text-xs text-muted-foreground">Working Hours</p><p className="text-sm font-medium">Mon–Fri 8AM–5PM</p></div></div>
                  <Separator />
                  <div className="flex items-start gap-3"><Phone className="w-4 h-4 text-[#1a6b3c] mt-0.5 flex-shrink-0" /><div><p className="text-xs text-muted-foreground">Contact Phone</p><p className="text-sm font-medium">{data.phone}</p></div></div>
                  <Separator />
                  <div className="flex items-start gap-3"><CircleDot className="w-4 h-4 text-[#c8a415] mt-0.5 flex-shrink-0" /><div><p className="text-xs text-muted-foreground">Avg. Processing</p><p className="text-sm font-medium">{data.processingTime}</p></div></div>
                  <Separator />
                  <div className="flex items-start gap-3"><Receipt className="w-4 h-4 text-[#c8a415] mt-0.5 flex-shrink-0" /><div><p className="text-xs text-muted-foreground">Service Fee</p><p className="text-sm font-medium">{data.serviceFee}</p></div></div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-[#f8faf8] py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] mb-8">REQUIREMENTS & ELIGIBILITY</motion.h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.requirements.map((req, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-[#1a6b3c] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{req}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] mb-8">APPLICATION PROCESS</motion.h2>
            <div className="space-y-0">
              {data.process.map((step, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex gap-5 pb-8 last:pb-0 relative">
                  {i < data.process.length - 1 && <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-[#1a6b3c]/15" />}
                  <div className="w-10 h-10 rounded-full bg-[#1a6b3c] text-white text-sm font-bold flex items-center justify-center flex-shrink-0 z-10 shadow">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-[#0d4a28] mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="bg-[#f8faf8] py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] mb-8">REQUIRED DOCUMENTS</motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.documents.map((doc, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <FileText className="w-6 h-6 text-[#1a6b3c] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-[#0d4a28] text-sm mb-1">{doc.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{doc.desc}</p>
                          <button className="text-xs text-[#1a6b3c] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            <Download className="w-3 h-3" /> DOWNLOAD TEMPLATE
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fees & Timeline */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] mb-8">FEES & TIMELINE</motion.h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-2"><CardTitle className="text-base font-bold text-[#0d4a28]">Fee Structure</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-0">
                      <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3 border-b border-border">
                        <span>Service Type</span><span className="text-center">Fee</span><span className="text-right">Processing</span>
                      </div>
                      {data.fees.map((f, i) => (
                        <div key={i} className="grid grid-cols-3 gap-2 py-3 border-b border-border/50 last:border-0 text-sm">
                          <span className="text-muted-foreground">{f.type}</span>
                          <span className="text-center font-semibold text-[#0d4a28]">{f.fee}</span>
                          <span className="text-right text-muted-foreground">{f.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="border-0 shadow-md h-full">
                  <CardHeader className="pb-2"><CardTitle className="text-base font-bold text-[#0d4a28]">Payment Methods</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { icon: Banknote, label: 'Cash', desc: 'Pay directly at the city finance office counter' },
                      { icon: Building2, label: 'Bank Transfer', desc: 'Transfer to the Dessie City Administration account at any commercial bank' },
                      { icon: Smartphone, label: 'Mobile Payment', desc: 'Use Telebirr, CBE Birr, or other mobile money platforms' },
                    ].map((m) => (
                      <div key={m.label} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1a6b3c]/10 flex items-center justify-center flex-shrink-0">
                          <m.icon className="w-5 h-5 text-[#1a6b3c]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0d4a28] text-sm">{m.label}</p>
                          <p className="text-xs text-muted-foreground">{m.desc}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[#f8faf8] py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h2 className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] inline-block">FREQUENTLY ASKED QUESTIONS</h2>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Accordion type="single" collapsible className="space-y-3">
                {data.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-xl shadow-sm px-5 border-0">
                    <AccordionTrigger className="text-sm font-semibold text-[#0d4a28] hover:no-underline py-4">
                      <span className="flex items-center gap-2 text-left"><HelpCircle className="w-4 h-4 text-[#1a6b3c] flex-shrink-0" /> {faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] mb-8">RELATED SERVICES</motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((name) => {
                const RIcon = serviceIcons[name] || FileText
                return (
                  <motion.div key={name} variants={fadeInUp}>
                    <Card className="gov-service-card border-0 shadow-sm cursor-pointer h-full" onClick={() => navigateTo('service-detail', { serviceId: name })}>
                      <CardContent className="p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#1a6b3c]/10 flex items-center justify-center flex-shrink-0">
                          <RIcon className="w-6 h-6 text-[#1a6b3c]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[#0d4a28] text-sm truncate">{name}</h3>
                          <p className="text-xs text-[#1a6b3c] flex items-center gap-1 mt-1">View Details <ChevronRight className="w-3 h-3" /></p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact for This Service */}
      <section className="bg-[#f8faf8] py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] mb-8">CONTACT FOR THIS SERVICE</motion.h2>
            <motion.div variants={fadeInUp}>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-[#1a6b3c] mt-0.5" /><div><p className="text-xs text-muted-foreground">Office Address</p><p className="text-sm font-medium">{data.office}, Dessie, Amhara, Ethiopia</p></div></div>
                      <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-[#1a6b3c] mt-0.5" /><div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm font-medium">{data.phone}</p></div></div>
                      <div className="flex items-start gap-3"><Mail className="w-5 h-5 text-[#1a6b3c] mt-0.5" /><div><p className="text-xs text-muted-foreground">Email</p><p className="text-sm font-medium">services@dessiecity.gov.et</p></div></div>
                      <div className="flex items-start gap-3"><Clock className="w-5 h-5 text-[#1a6b3c] mt-0.5" /><div><p className="text-xs text-muted-foreground">Hours</p><p className="text-sm font-medium">Mon–Fri, 8:00 AM – 5:00 PM</p></div></div>
                    </div>
                    <div className="space-y-3">
                      <Input placeholder="Your Name" value={inquiryName} onChange={(e) => setInquiryName(e.target.value)} className="bg-[#f8faf8] border-border" />
                      <Input placeholder="Your Email" type="email" value={inquiryEmail} onChange={(e) => setInquiryEmail(e.target.value)} className="bg-[#f8faf8] border-border" />
                      <Textarea placeholder="Your inquiry about this service..." value={inquiryMsg} onChange={(e) => setInquiryMsg(e.target.value)} rows={3} className="bg-[#f8faf8] border-border" />
                      <Button className="w-full bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-semibold">
                        <Send className="w-4 h-4 mr-2" /> SUBMIT INQUIRY
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
