import React, { useEffect, useRef, useState } from 'react';

const MinuteCountDownTimer: React.FC<{
    remainingTimeByMillisecond: number;
    onChangeTime: (restTime: number) => void;
}> = ({ remainingTimeByMillisecond, onChangeTime }) => {
    const padNumber = (num: number, length: number) => {
        return String(num).padStart(length, '0');
    };

    const tempMin = remainingTimeByMillisecond ? Math.floor(remainingTimeByMillisecond / (1000 * 60)) : 0;
    const tempSec = remainingTimeByMillisecond ? Math.floor((remainingTimeByMillisecond / 1000) % 60) : 0;

    const initialTime = useRef(remainingTimeByMillisecond);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const interval = useRef<any>(null);

    const [min, setMin] = useState(padNumber(tempMin, 2));
    const [sec, setSec] = useState(padNumber(tempSec, 2));

    useEffect(() => {
        setMin(padNumber(tempMin, 2));
        setSec(padNumber(tempSec, 2));
        initialTime.current = remainingTimeByMillisecond;
        onChangeTime(initialTime.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remainingTimeByMillisecond]);

    useEffect(() => {
        interval.current = setInterval(() => {
            if (initialTime.current > 1000) {
                initialTime.current -= 1000;
            }

            if (initialTime.current <= 1000) {
                initialTime.current -= initialTime.current;
            }
            setMin(padNumber(parseInt(`${Math.floor(initialTime.current / (1000 * 60))}`, 10), 2));
            setSec(padNumber(parseInt(`${Math.floor((initialTime.current / 1000) % 60)}`, 10), 2));
            onChangeTime(initialTime.current);
        }, 1000);
        return () => clearInterval(interval.current);
    }, [onChangeTime]);

    useEffect(() => {
        if (initialTime.current <= 0) {
            setTimeout(() => {
                clearInterval(interval.current);
                onChangeTime(0);
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sec]);

    return (
        <>
            {min} : {sec}
        </>
    );
};

export default React.memo(MinuteCountDownTimer);
