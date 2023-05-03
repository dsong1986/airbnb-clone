'use client'
import { useCallback, useMemo, useState } from "react";
import Modal from "./Modal"
import useHostModal from "@/app/hooks/useHostModal"
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import HostPlaceInput from "../inputs/HostPlaceInput";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const HostModal = () => {
    const hostModal = useHostModal();
    const [step, setStep] = useState(STEPS.CATEGORY)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            error,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: 'Beach',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            title: '',
            description: '',
            imageSrc: '',
            price: 1,
        }
    })

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true
        })
    }
    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')

    const Map = useMemo(
        () => dynamic(() => import('../Map'), { ssr: false }),
        [location]);

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    // close the popup
    const handleClose = useCallback(() => {
        setTimeout(() => {
            hostModal.onClose();
        }, 300)
    }, [hostModal.onClose])

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back'
    }, [step])

    let bodyContent = (
        <div>
            <div className="font-semibold text-xl p-3">Choose your category </div>
            <div className="
            grid 
            grid-cols-1 
            md:grid-cols-2
            gap-3
            max-h-[50vh]
            overflow-y-auto
            py-2
            pr-2
            ">
                {
                    categories.map((item) => (
                        <div key={item.label}>
                            <CategoryInput
                                onClick={
                                    (category) => { setCustomValue('category', category) }
                                }
                                label={item.label}
                                icon={item.icon}
                                selected={item.label === category}
                            />

                        </div>
                    ))
                }
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-4'>
                <Heading
                    title="Where is your place located"
                    subTitle="Help guests find you"
                />
                {/* Select Country */}
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                {/* Map */}
                <Map
                    center={location?.latlng}
                />
            </div>

        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <Heading
                    title="Share some basic about your place"
                    subTitle="What amenities do you have?"
                />
                <HostPlaceInput
                    onChange={(value) => setCustomValue('guestCount', value)}
                    value={guestCount}
                    title="Guests"
                    subTitle="How many guests do you allow?"
                />
                <hr />
                <HostPlaceInput
                    onChange={(value) => setCustomValue('roomCount', value)}
                    value={roomCount}
                    title="Rooms"
                    subTitle="How many rooms do you have?"
                />
                <hr />
                <HostPlaceInput
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                    value={bathroomCount}
                    title="Bathrooms"
                    subTitle="How many bathrooms do you have?"
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div></div>
        )
    }
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div></div>
        )
    }
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div></div>
        )
    }
    return (
        <Modal
            isOpen={hostModal.isOpen}
            title="Airbnb your home"
            onClose={handleClose}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
            onSubmit={onNext}
        />
    )

}

export default HostModal;