import pandas as pd


def clean_data(raw_csv_path: str, cleaned_csv_path: str):
    dtype = {
        'state': str,
        'city': str,
        'station_name': str,
        'id': str,
        'latitude': float,
        'longitude': float
    }

    df = pd.read_csv(raw_csv_path, dtype=dtype, parse_dates=['local_time (IST)'])

    # Rename columns to concise names
    df.rename(columns=lambda x: x.strip().lower().replace(' ', '_').replace('(', '').replace(')', '').replace('.', '').replace('/', '_'), inplace=True)

    # Clean numeric columns (potentially bad data values replaced by NaN)
    numeric_cols = ['at_degc', 'rh_%', 'pm2_5_ug_m3', 'pm10_ug_m3', 'co2_ppm']
    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce')

    # Drop rows where latitude or longitude is missing
    df.dropna(subset=['latitude', 'longitude'], inplace=True)

    # Sort by datetime
    df.sort_values('local_time_ist', inplace=True)

    # Reset index
    df.reset_index(drop=True, inplace=True)

    # Remove obvious outliers
    # For PM2.5 and PM10, values > 1000 could be considered outliers
    df.loc[df['pm2_5_ug_m3'] > 1000, 'pm2_5_ug_m3'] = pd.NA
    df.loc[df['pm10_ug_m3'] > 1000, 'pm10_ug_m3'] = pd.NA

    # Forward fill small missing values for continuity
    df.fillna(method='ffill', inplace=True)

    # Save cleaned data
    df.to_csv(cleaned_csv_path, index=False)

    print(f"Cleaned data saved to {cleaned_csv_path}")


if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: python clean_data.py raw_csv_path cleaned_csv_path")
        sys.exit(1)
    clean_data(sys.argv[1], sys.argv[2])
