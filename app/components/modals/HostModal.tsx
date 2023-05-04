'use client'
import { useCallback, useMemo, useState } from "react";
import Modal from "./Modal"
import useHostModal from "@/app/hooks/useHostModal"
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import HostPlaceInput from "../inputs/HostPlaceInput";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const HostModal = () => {
    const router = useRouter();
    const hostModal = useHostModal();
    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
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
    const imageSrc = watch('imageSrc')

    const Map = useMemo(
        () => dynamic(() => import('../Map'), { ssr: false }),
        [location]);

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    //handle submit to create a new hosting post
    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
          toast.success('Listing created!');
          router.refresh();
          reset(); // reset the entire form
          setStep(STEPS.CATEGORY)
          hostModal.onClose();
        })
        .catch(() => {
          toast.error('Something went wrong.');
        })
        .finally(() => {
          setIsLoading(false);
        })



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

    // Step 3: fill in basic counter information about hosting
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

    // Step 3: upload images
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div>
                <Heading 
                    title = "Add a photo of your place"
                    subTitle="Show guests what your place looks like"
                />
                <ImageUpload 
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value = {imageSrc}
                />
            </div>
        )
    }
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className=" flex flex-col gap-4">
                <Heading 
                    title = "How do you describe your place?"
                    subTitle="Short and sweet works best"
                />
                <Input 
                    id = "title"
                    label="Title"
                    disabled={isLoading}
                    register = {register}
                    errors = {errors}
                    required
               />
               <hr />
               <Input 
                    id = "description"
                    label="Description"
                    disabled={isLoading}
                    register = {register}
                    errors = {errors}
                    required
               />
            </div>
        )
    }

    // final step to publish a hosting place 
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <Heading 
                    title = "Now, set your price"
                    subTitle="How much do you want to charge per night?"
                />
                <Input 
                    id = "price"
                    label = "Price"
                    register = {register}
                    errors = {errors}
                    required
                    disabled={isLoading}
                    type="number"
                    formatPrice
                />

            </div>
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
            onSubmit={handleSubmit(onSubmit)}
        />
    )

}

export default HostModal;