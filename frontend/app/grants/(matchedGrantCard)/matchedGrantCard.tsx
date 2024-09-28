import { Grant, LikedStatus } from "@lib/graphql-typings.generated";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Image as ImageNextUI, Popover, PopoverContent, PopoverTrigger, Textarea, Tooltip } from "@nextui-org/react";
import MoneyBagIcon from "@public/icons/money-bag.svg";
import ThumbsDownIcon from '@public/icons/thumbs_down.svg';
import ThumbsUpIcon from '@public/icons/thumbs_up.svg';
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import styles from './matchedGrantCard.module.css'
import clsx from "clsx";

type MatchedGrantCardProps = {
    // General props
    className: string;

    // Data props
    grant: Grant

    // Action / Callback props
    onThumbsUp: (grantId: string, feedbackText?: string) => void
    onThumbsDown: (grantId: string, feedbackText?: string) => void
    onApply: (grantId: string) => void
};

/**
 * A utility component that displays the areas of funding in a pretty way :)
 */
const FundingAreasContainer = ({ fundingAreas }: { fundingAreas: string[] }) => {
    const MAX_DISPLAYED_AREAS: number = 5;
    const FINAL_DISPLAYED_AREA_IDX = MAX_DISPLAYED_AREAS - 1;

    const displayedFundingAreas: string[] = useMemo(
        () => (
            fundingAreas.slice(0, MAX_DISPLAYED_AREAS)
        ),
        [fundingAreas]
    );

    const nonDisplayedFundingAreas: string[] = useMemo(
        () => (
            fundingAreas.slice(FINAL_DISPLAYED_AREA_IDX, -1)
        ),
        [fundingAreas]
    );

    const nonDisplayedFundingAreasTooltip: string = useMemo(
        () => (
            nonDisplayedFundingAreas.join(",\n")
        ),
        [nonDisplayedFundingAreas]
    )

    return <div className="grid grid-cols-2 gap-2">
        {
            displayedFundingAreas.map(
                (area: string, idx: number) =>
                (
                    <p key={idx} className="flex text-gray-400 bg-gray-100 p-1 box-border w-min-content rounded-lg items-center justify-center">
                        {area}
                    </p>
                )
            )
        }

        {/* "Plus" icon tooltip, showing the other tags */}
        {
            nonDisplayedFundingAreas.length > 0 &&
            (
                <div className="flex text-gray-400 bg-gray-100 p-1 items-center justify-center rounded-lg max-w-max">
                    +{nonDisplayedFundingAreas.length}
                </div>
            )
        }
    </div>
}

/**
 * Match card component
 */
const MatchedGrantCard = (props: MatchedGrantCardProps) => {
    // Props
    const {
        className,
        grant,
        onThumbsUp,
        onThumbsDown,
        onApply,
    } = props;

    const {
        id,
        foundation: {
            name: foundationName
        },
        name: grantName,
        location,
        areasOfFunding,
        amountDollars,
        applicationStartDate,
        applicationEndDate
    } = grant;


    // State variables
    const [isFeedbackPopoverOpen, setIsFeedbackPopoverOpen] = useState(false);
    const [likedStatus, setLikedStatus] = useState<LikedStatus | undefined>(undefined);
    const [feedbackText, setFeedbackText] = useState('');


    // General variables
    const applicationStartDateStr = useMemo(
        () => {
            if (new Date(applicationStartDate) > new Date()) {
                return 'Apply now'
            }

            return new Date(applicationStartDate).toISOString().split('T')[0]
        },
        [applicationStartDate]
    );

    const applicationEndDateStr = useMemo(
        () => (new Date(applicationEndDate).toISOString().split('T')[0]),
        [applicationEndDate]
    );


    // Event handlers
    const toggleFeedbackPopover = useCallback(() => (
        setIsFeedbackPopoverOpen(!isFeedbackPopoverOpen)
    ),
        [isFeedbackPopoverOpen, setIsFeedbackPopoverOpen]
    );

    const handleOnPressThumbsUpButton = useCallback(() => {
        setLikedStatus(isFeedbackPopoverOpen ? undefined : LikedStatus.LIKED)
        toggleFeedbackPopover();
    }, [isFeedbackPopoverOpen, setLikedStatus, toggleFeedbackPopover]);

    const handleOnPressThumbsDownButton = useCallback(() => {
        setLikedStatus(isFeedbackPopoverOpen ? undefined : LikedStatus.DISLIKED);
        toggleFeedbackPopover();
    }, [isFeedbackPopoverOpen, setLikedStatus, toggleFeedbackPopover])

    const handleOnPressSubmitFeedback = useCallback(() => {
        if (likedStatus === LikedStatus.LIKED) {
            onThumbsUp(id, feedbackText)
        } else if (likedStatus === LikedStatus.DISLIKED) {
            onThumbsDown(id, feedbackText)
        }

        setFeedbackText('')
        toggleFeedbackPopover()
    }, [likedStatus, toggleFeedbackPopover]);


    return (
        <Card className={clsx(`flex flex-grow max-w-xs p-4 ${styles[`hoverable-card`]} ${className}`, {
            [styles['hoverable-card-hovered']]: isFeedbackPopoverOpen
        })}>
            <CardHeader className="flex flex-col h-auto py-0">

                {/* Organization avatar & thumb icons row */}

                <div className="flex items-center justify-between w-full mb-1">
                    <Avatar name={foundationName[0]} radius="full" />

                    <Popover placement="bottom" isOpen={isFeedbackPopoverOpen}>
                        <PopoverTrigger>
                            <div className="flex">
                                <Button
                                    isIconOnly
                                    className="mr-4 bg-white border p-1"
                                    onPress={handleOnPressThumbsUpButton}
                                >
                                    <Image
                                        src={ThumbsUpIcon}
                                        alt="Thumbs up"
                                        width={32}
                                        height={32}
                                    />
                                </Button>

                                <Button
                                    isIconOnly
                                    className="bg-white border p-1"
                                    onPress={handleOnPressThumbsDownButton}
                                >
                                    <Image
                                        src={ThumbsDownIcon}
                                        alt="Thumbs down"
                                        width={32}
                                        height={32}
                                    />
                                </Button>
                            </div>
                        </PopoverTrigger>

                        <PopoverContent>
                            <Textarea
                                className="mb-2"
                                placeholder="(Optional) Write some feedback."
                                value={feedbackText}
                                onValueChange={setFeedbackText}
                            />

                            <Button color="primary" onPress={handleOnPressSubmitFeedback}>
                                Submit
                            </Button>
                        </PopoverContent>
                    </Popover>
                </div>



                <div className="flex flex-col justify-start w-full">

                    {/* Organization name */}
                    <h3 className="overflow-ellipsis whitespace-nowrap max-w-max overflow-hidden">{foundationName}</h3>

                    {/* Grant name */}
                    <h1 className="overflow-ellipsis whitespace-nowrap max-w-max overflow-hidden">{grantName}</h1>

                </div>

            </CardHeader>

            <CardBody className="flex flex-col">

                {/* Grant amount & deadline row */}
                <div className="flex mb-2 h-28">

                    {/* Amount section */}
                    <div
                        className="flex flex-col justify-between w-1/2 rounded-lg mr-1 p-2"
                        style={{
                            background: "#fdbeb1"
                        }}
                    >
                        <Image src={MoneyBagIcon} alt="" width={24} height={24} />


                        <div>
                            <h1 style={{ color: '#ff5733' }}>${amountDollars}</h1>
                            <h3>Avg Amount</h3>
                        </div>
                    </div>

                    {/* Deadline section */}
                    <div className="flex flex-col justify-evenly w-1/2 bg-gray-100 rounded-lg p-2">
                        <div>
                            <h4 className="text-gray-400">Deadline</h4>
                            <h4>{applicationEndDateStr}</h4>
                        </div>

                        {/* Divider */}
                        <div className="border rounded-full" />

                        <div>
                            <h4 className="text-gray-400">Starts At</h4>
                            <h4>{applicationStartDateStr}</h4>
                        </div>
                    </div>
                </div>

                {/* Location row*/}
                <div className="flex justify-between">
                    <h3 className="text-gray-400" >Location</h3>
                    <h3>{location}</h3>
                </div>

                {/* Areas of funding */}
                <h3 className="text-gray-400">Areas of funding</h3>

                <FundingAreasContainer fundingAreas={areasOfFunding} />

            </CardBody>

            <CardFooter className={styles['hoverable-card-footer']} >
                <Button
                    color="primary"
                    fullWidth
                    onPress={() => onApply(id)}
                >
                    Apply here
                </Button>
            </CardFooter>
        </Card>
    )
};

export default MatchedGrantCard;
