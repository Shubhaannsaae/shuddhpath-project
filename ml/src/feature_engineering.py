import pandas as pd


def add_features(csv_path: str, output_path: str):
    df = pd.read_csv(csv_path, parse_dates=['local_time_ist'])

    # Time features
    df['hour'] = df['local_time_ist'].dt.hour
    df['dayofweek'] = df['local_time_ist'].dt.dayofweek
    df['month'] = df['local_time_ist'].dt.month

    # Lag features for PM2.5 (previous hour)
    df.sort_values(['station_name', 'local_time_ist'], inplace=True)
    df['pm2_5_lag_1h'] = df.groupby('station_name')['pm2_5_ug_m3'].shift(1)

    # Rolling mean features with 3-hour window
    df['pm2_5_rolling_mean_3h'] = df.groupby('station_name')['pm2_5_ug_m3'].rolling(window=3, min_periods=1).mean().reset_index(level=0, drop=True)

    # Weather features (temperature and humidity normalized)
    df['at_degc_norm'] = (df['at_degc'] - df['at_degc'].mean()) / df['at_degc'].std()
    df['rh_%_norm'] = (df['rh_%'] - df['rh_%'].mean()) / df['rh_%'].std()

    # Drop rows with NA values in lag features
    df.dropna(subset=['pm2_5_lag_1h'], inplace=True)

    df.to_csv(output_path, index=False)
    print(f"Feature engineered data saved to {output_path}")


if __name__ == '__main__':
    import sys
    if len(sys.argv) != 3:
        print('Usage: python feature_engineering.py input_csv output_csv')
        sys.exit(1)
    add_features(sys.argv[1], sys.argv[2])
