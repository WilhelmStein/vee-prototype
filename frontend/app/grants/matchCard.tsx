import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Image as ImageNextUI, Tooltip } from "@nextui-org/react";
import MoneyBagIcon from "@public/icons/money-bag.svg";
import ThumbsDownIcon from '@public/icons/thumbs_down.svg';
import ThumbsUpIcon from '@public/icons/thumbs_up.svg';
import Image from "next/image";
import { useMemo } from "react";

type MatchCardProps = {
    className: string;

    foundationName: string;
    grantName: string;
    location: string;
    areasOfFunding: string[]
    amountDollars: number;
    applicationStartDate: Date;
    applicationEndDate: Date;
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
const MatchCard = (props: MatchCardProps) => {

    const {
        className,
        foundationName,
        grantName,
        location,
        areasOfFunding,
        amountDollars,
        applicationStartDate,
        applicationEndDate,
    } = props;

    const applicationStartDateStr = useMemo(
        () => {
            if (new Date(applicationStartDate) > new Date()) {
                return 'Apply now'
            }

            return `${new Date(applicationStartDate).getDate()} / ${new Date(applicationStartDate).getMonth()}`
        },
        [applicationStartDate]
    );

    const applicationEndDateStr = useMemo(
        () => (`${new Date(applicationEndDate).getDate()} / ${new Date(applicationEndDate).getMonth()}`),
        [applicationEndDate]
    );

    return (
        <Card className={`flex flex-grow max-w-xs p-4 ${className}`}>
            <CardHeader className="flex flex-col h-28">

                {/* Organization avatar & thumb icons row */}
                <div className="flex items-center justify-between w-full">

                    <Avatar name={foundationName[0]} radius="full" />

                    <div className="flex">
                        <Button isIconOnly className="mr-4 bg-white border p-1">
                            <Image
                                src={ThumbsUpIcon}
                                alt="Thumbs up"
                                width={32}
                                height={32}
                            />
                        </Button>

                        <Button isIconOnly className="bg-white border p-1">
                            <Image
                                src={ThumbsDownIcon}
                                alt="Thumbs down"
                                width={32}
                                height={32}
                            />
                        </Button>
                    </div>
                </div>


                <div className="flex flex-col justify-start w-full">

                    {/* Organization name */}
                    <h3 className="overflow-ellipsi whitespace-nowrap max-w-max overflow-hidden">{foundationName}</h3>

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
                            <h4 className="text-gray-400">Getting Started</h4>
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

            <CardFooter>
                <Button color="primary" fullWidth>Apply here</Button>
            </CardFooter>
        </Card>
    )
};

export default MatchCard;
